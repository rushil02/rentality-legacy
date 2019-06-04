import {include} from 'named-urls';

export default {
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
        update: 'update/:houseUUID'
    }),
    image: include('image', {
        list: 'list/:houseUUID',
        update: 'update/:houseUUID'
    }),
}