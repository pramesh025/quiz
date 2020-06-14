$(document).ready(function() {
    function a() {
        let y = [];
        $.ajax({
            url: "ques_ans.json",
            async: false,
            success: function(result) {
                y = result.data;
                console.log(y);
            }
        });
        console.log(y);
        return y;
    }
    let b = a();
    console.log(b);
});