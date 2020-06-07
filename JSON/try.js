$(document).ready(function() {
    function ques_randomizer() {
        let y = [];
        let rand = [];
        $.ajax({
            url: "ques_ans.json",
            async: false,
            success: function(result) {
                y = result.data;
            }
        });
        let temp = y;
        for (let i = 0; i < 10; i += 1) {
            let index = Math.floor(Math.random() * temp.length);
            console.log(index);
            rand.push(temp[index]);
            temp.splice(index, 1);
        }
        return rand;
    }

    let b = ques_randomizer();
    console.log(b)
});