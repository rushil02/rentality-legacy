import React from "react"
import ScriptLoader from "react-script-loader-hoc"
import { ComponentLoadingSpinner } from "core/loadingSpinners/LoadingSpinner"

const StripePayment = ({ scriptsLoadedSuccessfully }) => {
    if (!scriptsLoadedSuccessfully) return <ComponentLoadingSpinner />

    return <div></div>
}

export default ScriptLoader("https://js.stripe.com/v3/")(StripePayment)
