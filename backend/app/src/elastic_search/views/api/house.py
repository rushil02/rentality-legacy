from rest_framework.views import APIView
from datetime import datetime
from elasticsearch import NotFoundError
from elasticsearch_dsl import Q
from rest_framework import status
from rest_framework.response import Response

from elastic_search.core.utils import connect
from elastic_search.models import House, Location


class HouseSearchView(APIView):
    filter_fields = ['obj_pk', ]

    def get(self, request, *args, **kwargs):
        in_loc_id = request.GET.get('loc_sugg', None)
        location = request.GET.get('location', '')

        if (not location or location == 'null') and not in_loc_id:
            return Response({'details': "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

        connect()
        start_date = request.GET.get('start-date', '')
        end_date = request.GET.get('end-date', '')

        try:
            slice_start = int(request.GET.get('pagination-start', 0))
            slice_end = int(request.GET.get('pagination-end', 12))
        except ValueError:
            slice_start = 0
            slice_end = 12

        in_loc = None
        if in_loc_id and in_loc_id != 'null':
            try:
                resp = Location.get(id=in_loc_id)
            except NotFoundError:
                pass
            else:
                if resp.geo_point:
                    in_loc = resp.geo_point
                else:
                    in_loc = None

        s = House.search()

        if start_date and end_date and "null" not in [start_date, end_date]:
            start_date = datetime.strptime(start_date, "%d-%m-%Y").date()
            end_date = datetime.strptime(end_date, "%d-%m-%Y").date()

            s = s.filter(
                Q({"nested": {
                    "path": "availabilities",
                    "query": {
                        "range": {
                            "availabilities.date_range": {
                                "gte": start_date.strftime("%d/%m/%Y"),
                                "lte": end_date.strftime("%d/%m/%Y"),
                                "format": "dd/MM/yyyy",
                                "relation": "contains"
                            }
                        }
                    }
                }
                })
            )

        if in_loc and location:
            s = s.filter(
                'geo_distance', distance='50km', geo_point=in_loc, distance_type='plane'
            ).query(
                Q("multi_match", query=location, fields=['address', 'location'], fuzziness="AUTO")
            )
        elif in_loc:
            s = s.filter(
                'geo_distance', distance='50km', geo_point=in_loc, distance_type='plane'
            )
        else:
            s = s.query(
                Q("multi_match", query=location, fields=['address', 'location'], fuzziness="AUTO")
            )
        s = s.sort('rent', '-create_time')[slice_start:slice_end]
        results = s.execute().to_dict()
        output = map(self.filter_data, results['hits']['hits'])
        return Response(output, status=status.HTTP_200_OK)

    def filter_data(self, es_record):
        for filter_field in self.filter_fields:
            del es_record['_source'][filter_field]
        return es_record
