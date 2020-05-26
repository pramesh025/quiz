$('.option').on('mouseenter', (event) => {
    $(event.currentTarget).addClass('hover');
}).on('mouseleave', (event) => {
    $(event.currentTarget).removeClass('hover');
}).on('click', (event) => {
    $('.options').children().removeClass('selected');
    $(event.currentTarget).addClass('selected');
});