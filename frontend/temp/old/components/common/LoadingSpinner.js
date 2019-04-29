import React from 'react';
import {GridLoader as Loader} from 'react-spinners';
import './LoadingSpinner.css';

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

export default class SpinnerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{"height": this.props.height}}>
                <div className='loading-container'>
                    <Loader
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
