// import React, {Component} from 'react';
// import axios from 'axios';
// import {reverse} from 'named-urls';
// import routes from 'routes';
// import DetailsComponent from "components/application/Details";
//
// const API = reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()});
//
// class Details extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data: null,
//             isLoading: false,
//             error: null,
//         };
//     }
//
//     componentDidMount() {
//         this.setState({isLoading: true});
//
//         axios.get(API, {
//             params: {
//                 start_date: new Date(),
//                 end_date: new Date(),
//                 promo_code: []
//             }
//         })
//             .then(result => this.setState({
//                     data: result.data,
//                     isLoading: false
//                 })
//             )
//             .catch(error => this.setState({
//                 error,
//                 isLoading: false
//             }));
//
//     }
//
//     render() {
//         return (<DetailsComponent data={this.state.data}/>)
//     }
//
// }
//
// export default Details;
