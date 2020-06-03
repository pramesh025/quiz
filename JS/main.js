$(document).ready(() => {
    let username = '';
    $('.username').focus();
    $('.username').on('keyup', () => {
        username = $('.username').val();
    })


    function ques_randomizer() {
        let y = [];
        $.ajax({
            url: "../JSON/ques_ans.json",
            async: false,
            success: function(result) {
                y = result.data;
            }
        });
        return y;
    }
    const datalist = ques_randomizer();
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
            Qno = 1;
            $('#qno').html(Qno + '.');
            $('#ques').html(datalist[Qno - 1].question);
            $('#op0').append(datalist[Qno - 1].answers[0]);
            $('#op1').append(datalist[Qno - 1].answers[1]);
            $('#op2').append(datalist[Qno - 1].answers[2]);
            $('#op3').append(datalist[Qno - 1].answers[3]);
        }
    }
    $('.login_button').on('click', takeQuiz);
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
        $('#error_msg').addClass('d-none');
    });



    function check_answer() {
        let selected;
        if (isSelected === '') {
            $('#error_msg').removeClass('d-none');
        }
        switch (isSelected) {
            case 'op0':
                selected = 0;
                break;
            case 'op1':
                selected = 1;
                break;
            case 'op2':
                selected = 2;
                break;
            case 'op3':
                selected = 3;
                break;
        }
        if (selected === datalist[Qno - 1].correctIndex) {
            $("#" + isSelected).removeClass('selected')
            $("#" + isSelected).addClass('correct')
            $('.option').off();
            $('#qn' + Qno).removeClass('active');
            $('#qn' + Qno).addClass('right');
        } else {
            $("#" + isSelected).removeClass('selected')
            $("#" + isSelected).addClass('wrong');
            $('#qn' + Qno).removeClass('active');
            $('#qn' + Qno).addClass('wrong');
            $("#op" + datalist[Qno - 1].correctIndex).addClass('correct');
            $('.option').off();
        }
    }

    $('#submit').on('click', check_answer);

});