import React from "react"

export function displayErrors(errorList, styleClass = "invalid-feedback") {
    if (errorList !== undefined && errorList !== null) {
        if (!Array.isArray(errorList)) {
            errorList = [errorList]
        }
        let disp = []
        for (let i = 0; i < errorList.length; i++) {
            disp.push(
                <div key={i} className={styleClass}>
                    {errorList[i]}
                </div>
            )
        }
        return <React.Fragment>{disp}</React.Fragment>
    } else {
        return null
    }
}

export function formatDateMDY(date) {
    if (date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    } else {
        return "N/A"
    }
}
