$(document).ready(() => {
    let username = '';
    $('.username').focus();
    $('.username').on('keyup', () => {
        username = $('.username').val();
    })

    let Qno;
    let isSelected = '';

    function takeQuiz() {
        if (username === '') {
            alert('Please enter a Username');
        } else {
            $('.log_in').addClass('d-none');
            $('.quiz_interface').removeClass('d-none');

            $('#name').html('Hello ' + username + '! ');

            //initializing questions
            $('#qn1').addClass('active');
            Qno = 1
            $('#qno').html(Qno + '.');
            $('#ques').html('Here we ask some question about something or someone or someplace or somebody and the user will have to answer it from the following options.')

        }
    }
    $('.login_button').on('click', takeQuiz)
    $('.username').keyup((event) => {
        if (event.keyCode === 13)
            takeQuiz();
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
        isSelected = $(event.currentTarget).attr("id");
        alert(isSelected);
    });




    function nextQuestion() {
        if (isSelected === '') {
            $('#error_msg').removeClass('d-none');
        }

    }
    $('#submit').on('click', nextQuestion);

});