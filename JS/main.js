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
    let datalist = [];
    let Qno;
    let isSelected = '';
    let total_marks = 0;

    function takeQuiz() {
        if (username === '') {
            alert('Please enter a Username');
        } else {
            //resetting
            for (let i = 0; i <= 3; i += 1) {
                //options
                $('#op' + i).removeClass('selected').removeClass('correct').removeClass('wrong')
            }
            for (let i = 1; i <= 10; i += 1) {
                //step progress
                $('#qn' + i).removeClass('active').removeClass('right').removeClass('wrong');
            }
            isSelected = '';
            total_marks = 0;
            datalist = ques_randomizer();
            option_event();


            $('.log_in').addClass('d-none');
            $('.quiz_interface').removeClass('d-none');
            $('#name').html('Hello ' + username + '! ');
            $('#c_username').html(username + '!!!');
            //initializing questions
            $('#qn1').addClass('active');
            Qno = 1;
            $('#qno').html(Qno + '.');
            $('#ques').html(datalist[Qno - 1].question);
            $('#op0').html("a. " + datalist[Qno - 1].answers[0]);
            $('#op1').html("b. " + datalist[Qno - 1].answers[1]);
            $('#op2').html("c. " + datalist[Qno - 1].answers[2]);
            $('#op3').html("d. " + datalist[Qno - 1].answers[3]);

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

    function option_event() {
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
    }

    function check_answer() {
        let selected = null;
        if (isSelected === '') {
            $('#error_msg').removeClass('d-none');
        } else {
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

                //addmarks
                total_marks += 1;

                //step progress
                $('#qn' + Qno).removeClass('active');
                $('#qn' + Qno).addClass('right');
            } else {
                $("#" + isSelected).removeClass('selected')
                $("#" + isSelected).addClass('wrong');
                $("#op" + datalist[Qno - 1].correctIndex).addClass('correct');
                $('.option').off();

                //step progress
                $('#qn' + Qno).removeClass('active');
                $('#qn' + Qno).addClass('wrong');
            }
            $('#submit').addClass('d-none');
            $('#next').removeClass('d-none');
            isSelected = '';
        }
    }

    function next_question() {
        if (Qno !== 10) {
            // alert(Qno);

            //reset
            $('.option').removeClass('selected').removeClass('wrong').removeClass('correct');
            option_event();


            Qno += 1;
            $('#qn' + Qno).addClass('active');

            $('#qno').html(Qno + '.');
            $('#ques').html(datalist[Qno - 1].question);
            $('#op0').html("a. " + datalist[Qno - 1].answers[0]);
            $('#op1').html("b. " + datalist[Qno - 1].answers[1]);
            $('#op2').html("c. " + datalist[Qno - 1].answers[2]);
            $('#op3').html("d. " + datalist[Qno - 1].answers[3]);
            $('#submit').removeClass('d-none');
            $('#next').addClass('d-none');
        } else {
            // alert(Qno);
            $('#congratz').removeClass('d-none');
            $('.quiz_interface').addClass('d-none');
            if (total_marks < 5)
                $('#congratz_msg').html('Try harder');
            else if (total_marks < 10)
                $('#congratz_msg').html('Great work');
            else if (total_marks == 10)
                $('#congratz_msg').html('Perfect');
            $('#final_score').html(total_marks * 10 + '%');
        }
    };
    $('#submit').on('click', check_answer);
    $('#next').on('click', next_question);
    $('#retake').on('click', () => {
        $('#submit').removeClass('d-none');
        $('#next').addClass('d-none');
        takeQuiz();
    });
    $('#exit').on('click', () => {
        location.reload();
    })
});