import APIModelAdapter, {DateRangeModel} from 'core/utils/ModelHelper';

export class House extends APIModelAdapter{
    //Declare all defaults here

    fieldMap() {
        return {
            uuid: {key: 'uuid',},
            title: {key: 'title',},
            houseNum: {key : 'address_hidden'},
            streetName: {key: 'address',},
            location: {key: 'location',},
            homeType: {key: 'home_type',},
            rent: {key: 'rent',},
            cancellationPolicy: {key: 'cancellation_policy'},
            status: {key: 'status'},
        }
    }
}
