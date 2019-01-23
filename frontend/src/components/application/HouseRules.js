import React, {Component} from 'react';


export default class HouseRules extends Component {

  houseRules = (rules) => {
    let houseRulesList = [];
    for (let rule of rules) {
      if (houseRulesList.length === rules.length / 2) {
        houseRulesList.push(
          <div>
            <div className="col-md-2"/>
            <div className="col-md-4"/>
          </div>
        )
      }

      houseRulesList.push(
        <div className="list">
          <h2>Rule Number {rule}</h2>
          <h3>Acceptable</h3>
          <p>More about the rule</p>
        </div>
      );

      if (houseRulesList.length === rules.length) {
        houseRulesList.push(<div className="col-md-2"/>)
      }
    }

    return houseRulesList
  };

  render() {
    return (
      <div>
        <h2>House Rules</h2>
        <p>
          Please Note: By applying to this home, you agree to follow {this.props.homeOwner}'s house rules.
        </p>
        <div className="rule">
          <div className="row">
            <div className="col-md-4">
              {this.houseRules(this.props.rules)}
            </div>
            <div className="col-md-2"/>
          </div>
        </div>
      </div>
    )
  }
};
