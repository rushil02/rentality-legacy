import {Redirect} from "react-router-dom";
import React from "react";
import routes from "routes";

function CheckAuthenticatedUser(props){ // TODO
    return <Redirect to={routes.auth.login}/>
}