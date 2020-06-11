import { Component } from "react"

export class StoreHelper extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        let _store = this.getStore()

        for (let i = 0; i < _store.length; i++) {
            this.state[_store[i]] = {
                data: undefined,
                render: () => this.forceUpdate(),
                updateStoreObject: (key, dataFn) => this.updateStoreObject(key, dataFn),
            }
        }
    }

    getStore() {
        return []
    }

    // Accepts a key as in 'getStore' and updates an object
    // Second Argument is a function which can accept previous data as input argument
    updateStoreObject = (key, dataFn) => {
        this.setState(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                data: dataFn(prevState[key].data),
            },
        }))
    }
}
