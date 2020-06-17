import React from "react"
import { GridLoader, PulseLoader } from "react-spinners"
import styles from "./LoadingSpinner.module.css"

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

export class ComponentLoadingSpinner extends React.Component {

    render() {
        return (
            <div style={{ height: "50vh" }}>
                <div className={styles.loadingContainer}>
                    <GridLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={10}
                        color={"#3fc692"}
                        loading={true}
                    />
                </div>
            </div>
        )
    }
}

export class ResponseLoadingSpinner extends React.Component {

    render() {
        return (
            <div style={{ height: this.props.height }}>
                <div className={styles.loadingContainer}>
                    <PulseLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={this.props.size || 10}
                        color={"#3fc692"}
                        loading={true}
                    />
                    {this.props.message ? <div className={styles.message}>{this.props.message}</div> : null}
                </div>
            </div>
        )
    }
}

export class ComponentRefreshLoadingSpinner extends React.Component {

    render() {
        return (
            <div style={{ height: this.props.height }}>
                <div className={styles.loadingContainer}>
                    <GridLoader
                        // css={override}
                        sizeUnit={"px"}
                        size={this.props.size || 10}
                        color={"#3fc692"}
                        loading={true}
                    />
                </div>
            </div>
        )
    }
}
