from rest_framework import serializers

FIELD_CODE_MAP = {
    'string': serializers.CharField,
    'num': serializers.IntegerField,
    'dec': serializers.DecimalField,
}


class HomeOwnerInfoSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def __init__(self, *args, **kwargs):
        try:
            fields = kwargs.pop('fields')
        except KeyError:
            raise AssertionError('Require fields argument to construct serializer')

        super(HomeOwnerInfoSerializer, self).__init__(*args, **kwargs)

        for field_name in fields:
            self.fields[field_name] = FIELD_CODE_MAP[fields[field_name]['type']]()
