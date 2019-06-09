import {include} from 'named-urls';

export default {
    interface: {
        base: '',
        create: 'create',
        edit: 'edit/:houseUUID',
    },
    APIs: {
        formOptions: 'form-options',
        detail: 'create/edit/:houseUUID',
        edit: 'create/edit/:houseUUID',
        create: 'create/api',
        availability: include('availability', {
            list: 'list/:houseUUID',
            create: ':houseUUID',
            update: ':houseUUID/:objID',
            remove: ':houseUUID/:objID',
        }),
        facilities: 'facilities/:houseUUID',
        rules: include('rules', {
            list: 'list/:houseUUID',
            update: 'update/:houseUUID',
        }),
        image: include('image', {
            list: 'list/:houseUUID',
            upload: 'upload/:houseUUID',
            update: ':houseUUID/:imageUUID',
        }),
        canPol: include('can-pol', {
            list: 'list/:houseUUID',
            update: 'update/:houseUUID'
        }),
        neighbourhoodDescriptors: 'neighbourhood-desc/:houseUUID',
    }
}
