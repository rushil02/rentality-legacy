from cities.models import PostalCode, City, Region, Subregion, District

from django.utils.encoding import force_text


class PostalCodeCustom(PostalCode):
    class Meta:
        proxy = True

    def get_verbose(self):
        return force_text(self.name)

    def get_all_keywords(self):  # FIXME : Add alternative names
        keywords = [self.code] + self.names + [force_text(str(x)) for x in self.hierarchy]

        if self.subregion:
            keywords += [force_text(str(x)) for x in self.subregion.hierarchy]
            keywords.append(force_text(self.subregion.name_std))
            keywords.append(force_text(self.subregion.region.name_std))
        else:
            if self.region:
                keywords += [force_text(str(x)) for x in self.region.hierarchy]
                keywords.append(force_text(self.region.name_std))

        if self.district:
            keywords += [force_text(str(x)) for x in self.district.hierarchy]
            keywords.append(force_text(self.district.name_std))
            keywords.append(force_text(self.district.city.name_std))
        else:
            if self.city:
                keywords += [force_text(str(x)) for x in self.city.hierarchy]
                keywords.append(force_text(self.city.name_std))

        return list(set(keywords))

    def get_identifier(self):
        return "POSTALCODE--%s" % self.pk

    def get_geo_loc_point(self):
        return self.location

    def get_parents(self):
        return force_text(', '.join([e for e in [
            force_text(self.district_name),
            force_text(self.subregion_name),
            force_text(self.region_name),
            force_text(self.country),
        ] if e]))


class CityCustom(City):
    class Meta:
        proxy = True

    def get_verbose(self):
        return force_text(self.name_std)

    def get_all_keywords(self):  # FIXME : Add alternative names
        keywords = [
                       force_text(self.name), force_text(self.name_std),
                   ] + [force_text(str(x)) for x in self.hierarchy]

        if self.subregion:
            keywords += [force_text(str(x)) for x in self.subregion.hierarchy]
            keywords.append(force_text(self.subregion.name_std))
            keywords.append(force_text(self.subregion.region.name_std))
        else:
            if self.region:
                keywords += [force_text(str(x)) for x in self.region.hierarchy]
                keywords.append(force_text(self.region.name_std))

        return list(set(keywords))

    def get_identifier(self):
        return "CITY--%s" % self.pk

    def get_geo_loc_point(self):
        return self.location

    def get_parents(self):
        sub_r = self.subregion.name_std if self.subregion else None
        r = self.region.name_std if self.region else None
        return force_text(', '.join([force_text(e) for e in [sub_r, r, force_text(self.country)] if e]))


class RegionCustom(Region):
    class Meta:
        proxy = True

    def get_verbose(self):
        return force_text(self.name_std)

    def get_all_keywords(self):  # FIXME : Add alternative names
        return list(
            set([force_text(self.name), force_text(self.name_std)] + [force_text(str(x)) for x in self.hierarchy])
        )

    def get_identifier(self):
        return "REGION--%s" % self.pk

    def get_geo_loc_point(self):
        return None

    def get_parents(self):
        return force_text(self.country)


class SubRegionCustom(Subregion):
    class Meta:
        proxy = True

    def get_verbose(self):
        return force_text(self.name_std)

    def get_all_keywords(self):  # FIXME : Add alternative names
        return list(
            set([force_text(self.name), force_text(self.name_std)] + [force_text(str(x)) for x in self.hierarchy])
        )

    def get_identifier(self):
        return "SUBREGION--%s" % self.pk

    def get_geo_loc_point(self):
        return None

    def get_parents(self):
        return force_text(', '.join([force_text(e) for e in [self.region.name_std, self.parent.country]]))


class DistrictCustom(District):
    class Meta:
        proxy = True

    def get_verbose(self):
        return force_text(self.name_std)

    def get_all_keywords(self):  # FIXME : Add alternative names
        return list(
            set([force_text(self.name), force_text(self.name_std)] + [force_text(str(x)) for x in self.hierarchy])
        )

    def get_identifier(self):
        return "DISTRICT--%s" % self.pk

    def get_geo_loc_point(self):
        return self.location

    def get_parents(self):
        sub_r = self.city.subregion.name_std if self.city.subregion else None
        r = self.city.region.name_std if self.city.region else None
        return force_text(', '.join([force_text(e) for e in [self.city.name_std, sub_r, r, self.city.country] if e]))
