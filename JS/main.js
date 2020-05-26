$(document).ready(() => {
    let username = '';
    $('.username').on('keyup', () => {
        username = $('.username').val();
    })

    function submit() {
        if (username === '') {
            alert('Please enter a Username');
        } else {
            $('.log_in').addClass('d-none');
            $('.quiz_interface').removeClass('d-none');

            $('#name').html('Hello ' + username + '! ');
        }
    }
    $('.login_button').on('click', submit)
    $('.username').keyup((event) => {
        if (event.keyCode === 13)
            submit();
    })
    $('.logout').on('click', () => {
        $('.log_in').removeClass('d-none');
        $('.quiz_interface').addClass('d-none');
        username = '';
        $('.username').val('');
    })

    $('.option').on('mouseenter', (event) => {
        $(event.currentTarget).addClass('hover');
    }).on('mouseleave', (event) => {
        $(event.currentTarget).removeClass('hover');
    }).on('click', (event) => {
        $('.options').children().removeClass('selected');
        $(event.currentTarget).addClass('selected');
    });
});