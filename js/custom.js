var project_open = false;

$('.content-item').click(function(){
    if(project_open == false){
        project_open = true;
        var offset = $(this).offset();
        var width = $(this).width();
        var clone = $(this).clone();

        clone.toggleClass('invisible content-item content-item-clone').appendTo("body").css({
            'position':'fixed',
            'top':offset.top,
            'left':offset.left,
            'width':width
            //'transform':'translateX(-50%)'
        }).removeClass('invisible').animate({
            'width':'70%',
            'height':'50vh',
            'top':'25px',
            'left':'15%',
            'background-color':'white',
            'box-shadow':'0 0 6px 3px black'
        },300);

        clone.find('.content-item-image').animate({
            //'width':'100%',
            //'margin-left':'10%',
            'height':'200px'
        },300);

        $('.overlay').fadeIn(300);
    }
});

$('.overlay').click(function() {
    $('.content-item-clone').fadeOut(300).remove();
    $(this).fadeOut(300);
    project_open = false;
});