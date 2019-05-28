import APIModelAdapter from 'core/utils/ModelHelper';


export class User extends APIModelAdapter {

    fieldMap() {
        return {
            email: {key: 'email'},
            firstName: {key: 'first_name'},
            lastName: {key: 'last_name'},
            profilePicture: {key: 'profile_picture'},
            accountType: {key: 'account_type'},
        }
    }
}