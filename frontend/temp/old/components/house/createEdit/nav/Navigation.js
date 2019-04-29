import React, {Component} from 'react';
import './Navigation.css';


export default class CreatePageComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="button top-margin">
                            <button type="submit" className="btn btn-link" id="submit-and-exit">Save and Exit
                            </button>
                            <a type="button" className="btn btn-link" id="next-step">Next</a>
                            <button type="submit" className="btn btn-link d-none" id="list-now">Enter Bank Details and
                                List
                            </button>
                            <a type="button" className="btn btn-link" id="prev-step">Back</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}