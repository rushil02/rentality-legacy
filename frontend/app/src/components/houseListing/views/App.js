import React, {Component} from "react"
import {reverse} from "named-urls"
import { navigate } from "gatsby"
import {PageRoutes} from "components/routes"
import {getFormOptions} from "../services"
import {StoreProvider} from "../dataContext"
import {CreateAppComponent, EditAppComponent} from "./AppComponent"
import {FormOptions, Navigator} from "../models"
import VerifyBillingInfo from "./VerifyBillingInfo";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formOptions: {
                data: new FormOptions({}),
                sync: this.setFormOptions,
            },
            navigator: {
                data: new Navigator(this.nextToEditMode),
                sync: () => this.forceUpdate(),
            },
        }
    }

    setFormOptions = () => {
        // Fetch Form options
        getFormOptions().then(result => {
            this.setState(prevState => ({
                ...prevState,
                formOptions: {
                    ...prevState.formOptions,
                    data: result,
                },
            }))
        })
    }

    componentDidMount() {
        // Fetch Form options
        this.state.formOptions.sync()
    }

    nextToEditMode = houseUUID => {
        navigate(reverse(PageRoutes.listing.edit, {houseUUID: houseUUID}) + "/2")
    }

    render() {
        return (
            <VerifyBillingInfo>
                <StoreProvider formOptions={this.state.formOptions} navigator={this.state.navigator}>
                    {this.props.mode === "edit" ? (
                        <EditAppComponent houseUUID={this.props.houseUUID}/>
                    ) : (
                        <CreateAppComponent/>
                    )}
                </StoreProvider>
            </VerifyBillingInfo>
        )
    }
}
