import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";
import Details from "./Details";
import Form from "../../components/application/Form";
import 'components/application/Application.css'

class Application extends Component {

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <div className="page-apply-now">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8">
                                <Form/>
                            </div>
                            <div className="col-lg-5 col-xl-4">
                                <Details/>
                            </div>
                            <div className="col-12">
                                <div className="button">
                                    <button type="button" className="btn btn-link">Apply Now</button>
                                    <button type="button" className="btn btn-link">Save application</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Application;