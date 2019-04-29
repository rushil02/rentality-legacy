import React from 'react';
import {GridLoader, PulseLoader} from 'react-spinners';
import './LoadingSpinner.css';

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

export class ComponentLoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{"height": "50vh"}}>
                <div className='loading-container'>
                    <GridLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={'#3fc692'}
                        loading={true}
                    />
                </div>
            </div>
        )
    }
}


export class ResponseLoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{"height": this.props.height}}>
                <div className='loading-container'>
                    <PulseLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={this.props.size || 10}
                        color={'#3fc692'}
                        loading={true}
                    />
                </div>
            </div>
        )
    }
}


export class ComponentRefreshLoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{"height": this.props.height}}>
                <div className='loading-container'>
                    <GridLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={this.props.size || 10}
                        color={'#3fc692'}
                        loading={true}
                    />
                </div>
            </div>
        )
    }
}
