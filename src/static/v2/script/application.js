$(document).ready(function () {
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
    <!-- menu end -->

    <!-- header start -->
    if ($('body > .header').length > 0) {
        $('body > .header [data-toggle="datepicker"]').datepicker({offset: 'top'});

        $('body > .header #city > .btn-group > .btn').click(function () {
            $('body > .header #other-city > .btn-group > .btn').removeClass('active');
            $('body > .header #city > .btn-group > .btn:last-child').removeClass('active');
            $('body > .header #other-city.collapse').collapse('hide');
        });

        $('body > .header #other-city > .btn-group > .btn').click(function () {
            $('body > .header #city > .btn-group > .btn').removeClass('active');
            $('body > .header #city > .btn-group > .btn:last-child').addClass('active');
        });
    }
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

    setTimeout(function () {
        var facility = $('body > .page-detail .left > .facility');
        var facilityNormalHeight = facility.find('.hide').css('height');

        facility.find('.hide').css('height', 'auto');
        var facilityFullHeight = facility.find('.hide').css('height');
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

    setTimeout(function () {
        var hostComment = $('body > .page-detail .left > .host-comment');
        var hostCommentNormalHeight = hostComment.find('.hide').css('height');

        hostComment.find('.hide').css('height', 'auto');
        var hostCommentFullHeight = hostComment.find('.hide').css('height');
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

    setTimeout(function () {
        var review = $('body > .page-detail .left > .review');

        review.find('.btn').append(' (' + review.find('.hide').find('.row').length + ')');

        var reviewNormalHeight = review.find('.hide').css('height');

        review.find('.hide').css('height', 'auto');
        var reviewFullHeight = review.find('.hide').css('height');
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

    <!-- page map filter start -->

    $('.page-map-filter [data-toggle="datepicker"]').datepicker({offset: 'top'});


    if ($('body > .page-map-filter .date').length > 0) {
        var plus_5_days = new Date;
        plus_5_days.setDate(plus_5_days.getDate() + 5);
        pickmeup('body > .page-map-filter .date', {
            flat: true,
            date: [
                new Date,
                plus_5_days
            ],
            mode: 'range',
            calendars: 2
        });
    }

    <!-- page map filter end -->

    <!-- page form start -->

    if ($('body > .page-form .right .calendar').length > 0) {
        var plus_5_days = new Date;
        plus_5_days.setDate(plus_5_days.getDate() + 5);
        pickmeup('body > .page-form .right .calendar', {
            flat: true,
            date: [
                new Date,
                plus_5_days
            ],
            mode: 'range',
            calendars: 2
        });
    }

    $('body > .page-form .right h1.title i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });

    $('body > .page-form .right .selection .add .btn').click(function () {
        var selection = $('body > .page-form .right .selection .add .form-control').val();

        if (selection != '#' && selection != '') {
            $('body > .page-form .right .selection .btn-group').append('<label class="btn btn-link"><input type="checkbox" name="selection[]" autocomplete="off">' + selection + '</label>');
            $('body > .page-form .right .selection .add .form-control').val('#');
        } else {
            return false;
        }
    });

    $('body > .page-form .right .payment .i .input i[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top'
    });

    $('body > .page-form .right .payment .list-inline li').click(function () {
        $('body > .page-form .right .payment .list-inline li').removeClass('active');
        $(this).addClass('active');
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > $('body > .menu.white').height()) {
            $('body > .page-form-status').css('top', '20px');
        } else {
            $('body > .page-form-status').css('top', $('body > .menu.white').outerHeight() + 20);
        }
    });

    $(window).scroll();

    <!-- page form end -->
});