import React, {Component} from 'react';
import {reverse} from "named-urls";
import routes from "routes";
import './Navbar.css';
import $ from "jquery";


export default class AuthNavbarComponent extends Component {

    componentDidMount() {
        $(window).resize(function () {
            $('#root').css('margin-top', $('#root > .menu.white').innerHeight() + 'px');
        });
        $(window).resize(function () {
            $('#root > .menu.white .gray').css('left', ($('#root > .menu.white .right .list-inline li.person').offset().left) + 'px');
        });
        $(window).resize();

        // FIXME: Needs to be converted to Another Component and Remove jQuery
         if ($('#root > .mobile-menu').length > 0 && $('#root > .mobile-menu-content').length > 0) {
             $('#root > .mobile-menu').click(function () {
                 if ($('#root > .mobile-menu-content').hasClass('open')) {
                     $('#root').css('overflow', 'auto');
                     $('#root > .mobile-menu-content').removeClass('open');
                     $('#root > .mobile-menu').removeClass('open');

                     $('#root > .mobile-menu-content').html('');
                 } else {
                     $('#root').css('overflow', 'hidden');
                     $('#root > .mobile-menu-content').addClass('open');
                     $('#root > .mobile-menu').addClass('open');

                     $('#root > .mobile-menu-content').html('<div class="top">' + $('#root > .menu .right').html() + '</div>' + '<div class="bottom">' + $('#root > .menu .center').html() + '</div>');

                     $('#root > .mobile-menu-content').find('.dropdown').off().click(function () {
                         if ($(this).hasClass('show')) {
                             $(this).removeClass('show');
                             $(this).find('.dropdown-menu').removeClass('show');
                         } else {
                             $(this).addClass('show');
                             $(this).find('.dropdown-menu').addClass('show');
                         }
                     });
                 }
             });
        }

    }

    render() {
        const profileImage = this.props.user.getData('profilePicture');
        return (
            <React.Fragment>
                <div className="mobile-menu white"/>
                <div className="mobile-menu-content white"/>
                <div className="menu white">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9 col-md-4 col-lg-4 col-xl-4 left">
                                <a href="/" className="logo"/>
                            </div>
                            <div className="col-3 col-md-8 col-lg-8 col-xl-4 center align-self-center">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href={reverse(routes.home)}>Home</a></li>
                                    <li className="list-inline-item"><a href={reverse(routes.blogs)}>Blog</a></li>
                                    <li className="list-inline-item"><a href={reverse(routes.howItWorks)}>How It
                                        Works</a>
                                    </li>
                                    <li className="list-inline-item"><a href={reverse(routes.react.houseListing.create)}>List Your
                                        Home</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-12 col-lg-12 col-xl-4 right align-self-center">
                                <ul className="list-inline">
                                    <li className="list-inline-item message">
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">Message<span>0</span></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item notification">
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">Notifications<span>0</span></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item person">
                                        <a href={reverse(routes.react.dashboard.base)} style={{textTransform: 'capitalize'}}>
                                            <div className="image">
                                                <img
                                                    src={profileImage ? profileImage : reverse(routes.static_route) + "image/placeholders/profile.png"}
                                                    className="w-100"
                                                    alt="Profile"/>
                                            </div>
                                            {this.props.user.getData('firstName')}
                                        </a>
                                    </li>
                                    <li className="list-inline-item setting">
                                        <div className="dropdown">
                                            <a href="#" data-toggle="dropdown">Setting</a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="" className="dropdown-item">My Profile</a>
                                                <a href="" className="dropdown-item">Logout</a>
                                            </div>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="gray"/>
                </div>
            </React.Fragment>
        )
    }
}