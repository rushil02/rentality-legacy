import React, {Component} from 'react';
import { getProfileData, getMockData, updateProfileData } from './Services';

export default class SamplePage extends Component {

    componentDidMount = () => {
        getProfileData().then(
            (result) => {
                console.log(result);
           }
        );

        getMockData().then(
           (result) => {
               console.log(result.data);
           }
        );
    }

    buttonClicked = () => {
        var payload = {
            account_type: "I", 
            first_name: "Pranav"
        }
        updateProfileData(payload).then(
            (result) => {
                console.log(result.data);
            }
        ).catch(
            (result) => {
                console.log("API Failed");
            }
        );
    }

    render() {
        return (
            <React.Fragment>
                <h1>Sample Page</h1>
                <button onClick={this.buttonClicked}>Update Profile First Name</button>
            </React.Fragment>
        )
    }

}