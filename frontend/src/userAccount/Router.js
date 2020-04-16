import routes from "routes";
import UserProfileContainer from "./views/userProfile/UserProfileContainer";
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary";
import Error404 from "core/errorHelpers/Error404";
import PayoutInfoContainer from "../houseListing/views/forms/payoutInfo/PayoutInfoContainer";

// const PaymentInfoContainer = React.lazy(() => import("./views/paymentInfo/PaymentInfoContainer"));


export default class Router extends Component {

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={routes.react.user.userProfile}
                                render={(props) => <UserProfileContainer/>}
                            />
                            <Route
                                path={routes.react.user.paymentInfo}
                                render={(props) => <PayoutInfoContainer/>}
                            />
                            <Route render={(props) => <Error404/>}/>
                        </Switch>
                    </BrowserRouter>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}




