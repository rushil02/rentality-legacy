import React from "react";

export function displayErrors(errorList, styleClass = "invalid-feedback") {
    if (errorList !== undefined && errorList !== null) {
        let disp = [];
        for (let i = 0; i < errorList.length; i++) {
            disp.push(
                <div key={i} className={styleClass}>
                    {errorList[i]}
                </div>
            );
        }
        return <React.Fragment>{disp}</React.Fragment>;
    } else {
        return null;
    }
}
