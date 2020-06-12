import React, {Component} from "react";
import styles from "./Subscription.module.css";

export class SubscriptionSection extends Component {
    render() {
        return (
            // < !--subscribe start-- >
            <div className={styles.subscribe}>
                <div className="container">
                    <h2 className={styles.title}>Subscribe for our Newsletter</h2>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className={styles.detail}>
                                <div className="row">
                                    <div className="col-md-7 col-lg-8">
                                        <input
                                            type="text"
                                            name=""
                                            className={styles.formControl}
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                    <div className="col-md-5 col-lg-4">
                                        <button type="button" className={styles.btn + " btn-link btn-block"}>
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
            // <!-- subscribe end -->
        );
    }
}
