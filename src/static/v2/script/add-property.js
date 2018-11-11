$(document).ready(function () {
    <!-- page form start -->

    $('button.anything-else-add').click(function () {
        $('.checkbox .list-inline').append('<li class="list-inline-item">\n' +
            '                                                <div class="custom-control custom-checkbox">\n' +
            '                                                    <input type="checkbox" id="checkbox-1" class="custom-control-input">\n' +
            '                                                    <label class="custom-control-label" for="checkbox-1">' + $('.anything-else').val() + '</label>\n' +
            '                                                </div>\n' +
            '                                            </li>');
        $('.anything-else').val('');
        $('.anything-else').focus();
    });

    if ($('body > .page-form .right .calendar').length > 0) {
        var plus_5_days = new Date;
        plus_5_days.setDate(plus_5_days.getDate() + 5);
        var plus_28_days = new Date;
        plus_28_days.setDate(plus_5_days.getDate() + 28);
        pickmeup('body > .page-form .right .calendar', {
            flat: true,
            date: [
                plus_5_days,
                plus_28_days
            ],
            mode: 'range',
            calendars: 2,
            format:'b. d, Y'
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


    // page initializer
    $('#sub-header-1, #sub-header-2, #sub-header-3').addClass('d-none');
    $('#form-1,#form-2,#form-3,#form-4,#form-5,#form-6,#form-7,#form-8,#form-9,#form-10,#form-11,#form-12').addClass('form-series d-none');

    var form_id = window.location.hash;
    if (!form_id) {
        $('#full-header-1').addClass('active');
        load_new_form(1);
    } else {
        var form_num = parseInt(form_id.split('-')[1]);
        for (var i = 1; i <= get_header_num(form_num); i++) {
            $('#full-header-' + i).addClass('active');
        }
        load_new_form(form_num);
    }

    <!-- page form end -->

});

function get_header_num(form_num) {
    return Math.floor((form_num - 1) / 4) + 1;
}


function check_buttons(form_val) {

    var prev_btn = $('a#prev-step');
    var next_btn = $('a#next-step');
    var list_now_btn = $('button#list-now');

    if (form_val === 1) {
        prev_btn.addClass('d-none');
        next_btn.removeClass('d-none');
        list_now_btn.addClass('d-none');
    } else if (form_val === 12) {
        prev_btn.removeClass('d-none');
        next_btn.addClass('d-none');
        list_now_btn.removeClass('d-none');
    } else {
        prev_btn.removeClass('d-none');
        next_btn.removeClass('d-none');
        list_now_btn.addClass('d-none');
    }
}

function clear_load_form(curr_form_num, next_form_num) {

    var curr_header_num = get_header_num(curr_form_num);
    var next_header_num = get_header_num(next_form_num);

    var i;
    if (next_header_num > curr_header_num) {
        for (i = curr_header_num; i <= next_header_num; i++) {
            $('#full-header-' + i).addClass('active');
        }
    } else if (curr_header_num > next_header_num) {
        for (i = next_header_num + 1; i <= curr_header_num; i++) {
            $('#full-header-' + i).removeClass('active');
        }
    }

    $('#sub-header-' + curr_header_num).addClass('d-none');
    $('#sub-title-' + curr_form_num).removeClass('active');
    $('#form-' + curr_form_num).addClass('d-none');

    load_new_form(next_form_num);


}

function load_new_form(form_num) {

    var header_num = Math.floor((form_num - 1) / 4) + 1;

    $('#sub-header-' + header_num).removeClass('d-none');

    $('#sub-title-' + form_num).addClass('active');

    $('#form-' + form_num).removeClass('d-none');

    check_buttons(form_num);

    $('html, body').stop().animate({scrollTop: $('.page-form').offset().top}, 500);
    $('body > .page-form .full-header .progress .progress-bar').css('width', (8.33 * form_num) + '%');

}


