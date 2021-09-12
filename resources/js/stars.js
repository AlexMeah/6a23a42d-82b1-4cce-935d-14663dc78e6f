import $ from 'jquery';

$(document).on('click', '.js-stars .stars__star', (event) => {
    console.log('wdas');
    $(event.currentTarget).siblings().removeClass('stars--fill');
    $(event.currentTarget).prevAll().addClass('stars--fill');
    $(event.currentTarget).addClass('stars--fill');
});
