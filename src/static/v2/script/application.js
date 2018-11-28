$(document).ready(function () {
    <!-- alert start -->
    $('.alert-auto-hide:not(".no-auto-hide")').delay(4000).slideUp("slow");
    <!-- alert end -->

    <!-- menu start -->
    if ($('body > .mobile-menu').length > 0 && $('body > .mobile-menu-content').length > 0) {
        $('body > .mobile-menu').click(function () {
            if ($('body > .mobile-menu-content').hasClass('open')) {
                $('body').css('overflow', 'auto');
                $('body > .mobile-menu-content').removeClass('open');
                $('body > .mobile-menu').removeClass('open');

                $('body > .mobile-menu-content').html('');
            } else {
                $('body').css('overflow', 'hidden');
                $('body > .mobile-menu-content').addClass('open');
                $('body > .mobile-menu').addClass('open');

                $('body > .mobile-menu-content').html('<div class="top">' + $('body > .menu .right').html() + '</div>' + '<div class="bottom">' + $('body > .menu .center').html() + '</div>');

                $('body > .mobile-menu-content').find('.dropdown').off().click(function () {
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

    if ($('body > .menu.white .gray').length > 0) {
        $(window).resize(function () {
            $('body > .menu.white .gray').css('left', ($('body > .menu.white .right .list-inline li.person').offset().left) + 'px');
        });

        $(window).resize();
    }

    if ($('body > .menu.white').length > 0) {
        $(window).resize(function () {
            $('body').css('margin-top', $('body > .menu.white').innerHeight() + 'px');
        });

        $(window).resize();
    }

    if ($('body > .menu > .alerts-holder').length > 0) {
        $(window).scroll(function () {
            if ($(window).scrollTop() > $('body > .menu.white').outerHeight()) {
                $('body > .menu > .alerts-holder').css('top', 15);
            } else {
                $('body > .menu > .alerts-holder').css('top', ($('body > .menu.white').outerHeight() - $(window).scrollTop()) + 15);
            }
        });

        $(window).scroll();
    }

    <!-- menu end -->

    <!-- footer start -->
    $(window).resize(function () {
        if (($('body > .footer').offset().top + $('body > .footer').outerHeight()) < $(window).height()) {
            $('body:not(:has(.page-map)) > .footer').css({'position': 'absolute', 'bottom': 0, 'left': 0, 'right': 0});
        }
    });

    $(window).resize();
    <!-- footer end -->

    <!-- header start -->

    pickmeup('body > .header .calendar', {
        flat: true,
        mode: 'range',
        calendars: 2
    });

    $('body > .header .calendar').on('pickmeup-change', function (e) {
        $('body > .header #placeholder-date').val(e.detail.formatted_date[0] + ' to ' + e.detail.formatted_date[1]);
        $('body > .header #id_start_date').val(e.detail.formatted_date[0]);
        $('body > .header #id_end_date').val(e.detail.formatted_date[1]);
    });

    // if ($('body > .header').length > 0) {
    //     $('body > .header [data-toggle="datepicker"]').datepicker({offset: 'top'});
    //
    //     $('body > .header #city > .btn-group > .btn').click(function () {
    //         $('body > .header #other-city > .btn-group > .btn').removeClass('active');
    //         $('body > .header #city > .btn-group > .btn:last-child').removeClass('active');
    //         $('body > .header #other-city.collapse').collapse('hide');
    //     });
    //
    //     $('body > .header #other-city > .btn-group > .btn').click(function () {
    //         $('body > .header #city > .btn-group > .btn').removeClass('active');
    //         $('body > .header #city > .btn-group > .btn:last-child').addClass('active');
    //     });
    // }

    // var plus_5_days = new Date;
    // plus_5_days.setDate(plus_5_days.getDate() + 5);
    // pickmeup('body > .header .start-calendar', {
    //     flat: true,
    //     date: [
    //         new Date,
    //         plus_5_days
    //     ],
    //     mode: 'range',
    //     calendars: 2
    // });

    // $('body > .header .start-calendar').on('pickmeup-change', function (e) {
    //     $('body > .header .start-date').val(e.detail.formatted_date[0]);
    //     $('body > .header .end-date').val(e.detail.formatted_date[1]);
    // });

    // var plus_5_days = new Date;
    // plus_5_days.setDate(plus_5_days.getDate() + 5);
    // pickmeup('body > .header .end-calendar', {
    //     flat: true,
    //     date: [
    //         new Date,
    //         plus_5_days
    //     ],
    //     mode: 'range',
    //     calendars: 2
    // });

    // $('body > .header .end-calendar').on('pickmeup-change', function (e) {
    //     $('body > .header .start-date').val(e.detail.formatted_date[0]);
    //     $('body > .header .end-date').val(e.detail.formatted_date[1]);
    // });
    <!-- header end -->

    <!-- logo start -->
    if ($('body > .logo').length > 0) {
        $('body > .logo .loop').owlCarousel({
            items: 6,
            loop: true,
            margin: 60,
            responsive: {
                0: {
                    items: 1,
                    margin: 15
                },
                800: {
                    items: 3,
                    margin: 30
                },
                1200: {
                    items: 6,
                    margin: 60
                }
            },
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true
        });
    }
    <!-- logo end -->

    <!-- comment start -->
    if ($('body > .comment').length > 0) {
        $('body > .comment .loop').owlCarousel({
            center: true,
            items: 3,
            loop: true,
            margin: 90,
            responsive: {
                0: {
                    items: 1,
                    margin: 15
                },
                480: {
                    items: 1,
                    margin: 15
                },
                768: {
                    items: 3,
                    margin: 90
                }
            },
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
        });
    }
    <!-- comment end -->

    <!-- singup login start -->

    $('#login-male').click(function () {
        $('#login-male').prop('checked', true);
        $('#login-famale').prop('checked', false);
    });

    $('#login-famale').click(function () {
        $('#login-famale').prop('checked', true);
        $('#login-male').prop('checked', false);
    });

    <!-- singup login end -->

    <!-- page detail gallery start -->

    if ($('body > .page-detail-gallery').length > 0) {
        $('body > .page-detail-gallery .loop').owlCarousel({
            items: 3,
            loop: true,
            margin: 10,
            responsive: {
                0: {
                    items: 1,
                    margin: 15
                },
                800: {
                    items: 3,
                    margin: 10
                }
            },
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true
        });
    }

    <!-- page detail gallery end -->

    <!-- page detail left facility start -->

    var facility = $('body > .page-detail .left > .facility');
    var facilityNormalHeight, facilityFullHeight;

    facilityNormalHeight = facility.find('.hide').css('height');

    $(window).resize(function () {
        facility.find('.hide').css('height', 'auto');
        facilityFullHeight = facility.find('.hide').css('height');
        facility.find('.hide').css('height', facilityNormalHeight);

        facility.removeClass('active')
        facility.find('.hide').animate({height: facilityNormalHeight}, 250);
    });

    setTimeout(function () {
        facility.find('.hide').css('height', 'auto');
        facilityFullHeight = facility.find('.hide').css('height');
        facility.find('.hide').css('height', facilityNormalHeight);

        facility.find('.btn').click(function () {
            if (!facility.hasClass('active')) {
                facility.addClass('active')
                facility.find('.hide').animate({height: facilityFullHeight}, 250);
            } else {
                facility.removeClass('active')
                facility.find('.hide').animate({height: facilityNormalHeight}, 250);
            }
        });
    }, 500);

    <!-- page detail left facility end -->

    <!-- page detail left host comment start -->

    var hostComment = $('body > .page-detail .left > .host-comment');
    var hostCommentNormalHeight, hostCommentFullHeight;

    hostCommentNormalHeight = hostComment.find('.hide').css('height');

    $(window).resize(function () {
        hostComment.find('.hide').css('height', 'auto');
        hostCommentFullHeight = hostComment.find('.hide').css('height');
        hostComment.find('.hide').css('height', hostCommentNormalHeight);

        hostComment.removeClass('active')
        hostComment.find('.hide').animate({height: hostCommentNormalHeight}, 250);
    });

    setTimeout(function () {
        hostComment.find('.hide').css('height', 'auto');
        hostCommentFullHeight = hostComment.find('.hide').css('height');
        hostComment.find('.hide').css('height', hostCommentNormalHeight);

        hostComment.find('.btn').click(function () {
            if (!hostComment.hasClass('active')) {
                hostComment.addClass('active')
                hostComment.find('.hide').animate({height: hostCommentFullHeight}, 250);
            } else {
                hostComment.removeClass('active')
                hostComment.find('.hide').animate({height: hostCommentNormalHeight}, 250);
            }
        });
    }, 500);

    <!-- page detail left host comment end -->

    <!-- page detail left host comment start -->
    $('body > .page-detail .left > .cancel i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });
    <!-- page detail left host comment end -->

    <!-- page detail left available start -->
    $('body > .page-detail .left > .available i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });
    <!-- page detail left available end -->

    <!-- page detail left review start -->

    var review = $('body > .page-detail .left > .review');

    review.find('.btn').append(' (' + review.find('.hide').find('.row').length + ')');

    var reviewNormalHeight = review.find('.hide').css('height'), reviewFullHeight;

    $(window).resize(function () {
        review.find('.hide').css('height', 'auto');
        reviewFullHeight = review.find('.hide').css('height');
        review.find('.hide').css('height', reviewNormalHeight);

        review.removeClass('active')
        review.find('.hide').animate({height: reviewNormalHeight}, 250);
    });

    setTimeout(function () {
        review.find('.hide').css('height', 'auto');
        reviewFullHeight = review.find('.hide').css('height');
        review.find('.hide').css('height', reviewNormalHeight);

        review.find('.btn').click(function () {
            if (!review.hasClass('active')) {
                review.addClass('active')
                review.find('.hide').animate({height: reviewFullHeight}, 250);
            } else {
                review.removeClass('active')
                review.find('.hide').animate({height: reviewNormalHeight}, 250);
            }
        });
    }, 500);

    <!-- page detail left review end -->

    <!-- page detail right date start -->

    $('body > .page-detail .right .date [data-toggle="datepicker"]').datepicker({offset: 'top'});
    $('body > .page-detail .right .date [data-toggle="datepicker"]').on('pick.datepicker', function (e) {
        e.preventDefault();

        var date = new Date(e.date);
        month = date.toLocaleString('en-us', {month: 'short'});

        $(e.currentTarget).val(month + ' ' + ('0' + date.getDay()).slice(-2) + ' ' + date.getFullYear());
    });

    <!-- page detail right date end -->

    <!-- page detail right amount start -->

    $('body > .page-detail .right .amount i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });

    <!-- page detail right amount end -->

    <!-- page apply now start -->

    $('.page-apply-now [data-toggle="datepicker"]').datepicker({offset: 'top'});
    $('.page-apply-now [data-toggle="datepicker"]').on('pick.datepicker', function (e) {
        e.preventDefault();

        var date = new Date(e.date);
        month = date.toLocaleString('en-us', {month: 'short'});

        $(e.currentTarget).val(month + ' ' + ('0' + date.getDay()).slice(-2) + ' ' + date.getFullYear());
    });

    <!-- page detail right date end -->

    <!-- page apply now start -->

    $('body > .page-apply-now .right i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });

    if ($('.page-apply-now .right .gallery').length > 0) {
        $('.page-apply-now .right .gallery .loop').owlCarousel({
            items: 3,
            loop: true,
            margin: 3,
            responsive: {
                0: {
                    items: 1,
                    margin: 3
                },
                800: {
                    items: 3,
                    margin: 3
                }
            },
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            dots: false
        });
    }

    <!-- page apply now end -->

    <!-- page blog start -->

    if ($('.page-blog .left-slide .loop').length > 0) {
        $('.page-blog .left-slide .loop').owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true
        });
    }

    if ($('.page-blog .left-detail .last .loop').length > 0) {
        $('.page-blog .left-detail .last .loop').owlCarousel({
            items: 1,
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true
        });
    }

    $('.page-blog .left-detail .comment .rate .stars > div').hover(function () {
        for (var i = 1; i < 6; i++) {
            if ($(this).data('id') < i) {
                $('.page-blog .left-detail .comment .rate .stars > div:nth-child(' + i + ')').removeClass('active');
            } else {
                $('.page-blog .left-detail .comment .rate .stars > div:nth-child(' + i + ')').addClass('active');
            }
        }
    }, function () {
        $('.page-blog .left-detail .comment .rate .stars > div').removeClass('active');
    });

    $('.page-blog .left-detail .comment .rate .stars > div').click(function () {
        alert('Rated: ' + $(this).data('id'));
    });

    <!-- page blog end -->

    <!-- page inbox start -->

    $('.page-inbox.chat .add .btn ').click(function () {
        if ($('.page-inbox.chat .add .message input.form-control').val() != '') {
            var message = '                    <div class="right">\n' +
                '                        <div class="row">\n' +
                '                            <div class="col-10 col-md-11">\n' +
                '                                <div class="message">\n' +
                '                                    <p>14: 04<span>4 August 2018</span></p>\n' +
                '                                    <p>\n' +
                '                                       ' + $('.page-inbox.chat .add .message input.form-control').val() + '\n' +
                '                                    </p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="col-2 col-md-1 align-self-center">\n' +
                '                                <img src="static/image/page-inbox/profile.png" class="w-100 rounded-circle" alt=""\n' +
                '                                     title="">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';

            $('.page-inbox.chat .chat').append(message);
            $('.page-inbox.chat .add .message input.form-control').val('');
        }
    });

    <!-- page inbox end -->

    <!-- page map filter start -->

    $('.page-map-filter [data-toggle="datepicker"]').datepicker({offset: 'top'});

    var plus_5_days = new Date;
    plus_5_days.setDate(plus_5_days.getDate() + 5);
    pickmeup('body > .page-map-filter .calendar', {
        flat: true,
        date: [
            new Date,
            plus_5_days
        ],
        mode: 'range',
        calendars: 2
    });

    $('body > .page-map-filter .calendar').on('pickmeup-change', function (e) {
        $('body > .page-map-filter .date').val(e.detail.formatted_date[0] + ' - ' + e.detail.formatted_date[1]);
    });

    <!-- page map filter end -->

    <!-- page dashboard start -->
    var now = new Date;
    if ($('body > .page-dashboard .right .calendar').length > 0) {
        pickmeup('body > .page-dashboard .right .calendar', {
            flat: true,
            mode: 'range',
            render: function (date) {
                // Disable example
                if (date < now) {
                    return {disabled: true, class_name: 'disable-day'};
                }
                return {};
            }
        });
    }
    <!-- page dashboard end -->


    <!-- page my profile start -->

    $('body > .page-my-profile .list-inline li').click(function () {
        $('body > .page-my-profile .list-inline li').removeClass('active');
        $(this).addClass('active');
    });

    $('body > .page-my-profile .input i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });

    <!-- page my profile end -->
});

$body = $("body");

$(document).on({
    ajaxStart: function () {
        $body.addClass("loading");
    },
    ajaxStop: function () {
        $body.removeClass("loading");
    }
});