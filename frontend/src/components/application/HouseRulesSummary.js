import React, {Component} from 'react';
import '../../components/application/Application.css'


export default class HouseRulesSummary extends Component {

  houseRules = (rules) => {
    let houseRulesList = [];
    for (let rule of rules) {
      houseRulesList.push(
        <div style={{width: "300px", display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: 1}}>
            <div>{rule.rule}</div>
          </div>
          <div style={{flex: 1}}>
              {rule.value}
          </div>
        </div>
      )
    }

    return houseRulesList
  };

  render() {
    return (
      <div>
        <h2 style={{fontSize: "20px", fontWeight: "700", color: "#84d8d1"}}>House Rules</h2>
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
