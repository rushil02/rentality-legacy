import {Component} from "react";


export class StoreHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let _store = Object.entries(this.getStore());
        for (let i = 0; i < _store.length; i++) {
            this.state[_store[i][0]] = {data: _store[i][1], update: (value) => this.updateStore(_store[i][0], value)}
        }
    }

    getStore() {

    }

    updateStore = (key, value) => {
        this.setState(prevState => (
            {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    data: value
                }
            })
        );
    };

}
