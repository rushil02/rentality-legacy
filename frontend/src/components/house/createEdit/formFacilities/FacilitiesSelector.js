import React, { Component } from 'react';
import FacilitesSelectorHandler from '../../../../containers/house/FacilitiesSelector';

export default class FormPrimaryComponent extends Component {
    render() {
        return (
            <React.Fragment>

                <div id="form-3">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <h1 className="title">Tick all the facilities you offer in the home</h1>
                            <FacilitesSelectorHandler
                                {...this.props}
                            />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
