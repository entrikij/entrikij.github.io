var project_open = false;

function checkBreakpoint(breakpoint){
    return !($('#' + breakpoint + '-check').is(':hidden'));
}

$('.content-item').click(function(){
    if(project_open == false){
        $('body').addClass('modal-open');

        project_open = true;
        var offset = $(this).offset();
        var width = $(this).width();
        var clone = $(this).clone();
        var expand_width = '80%';
        var expand_left = '10%';

        if(checkBreakpoint('xs')){
            expand_width = '90%';
            expand_left = '5%';
        }
        else if(checkBreakpoint('sm')){
            expand_width = '86%';
            expand_left = '7%';
        }
        else if(checkBreakpoint('md')){
            expand_width = '80%';
            expand_left = '10%';
        }
        else{
            expand_width = '70%';
            expand_left = '15%';
        }

        // $(this).animate({
        //    'opacity':'0'
        // }, 0);

        clone.toggleClass('invisible content-item content-item-clone box-shadow').appendTo("body").css({
            'position':'fixed',
            'top':offset.top - window.scrollY,
            'left':offset.left,
            'width':width
            //'transform':'translateX(-50%)'
        }).removeClass('invisible').animate({
            'width':expand_width,
            'height':'50vh',
            'top':'25px',
            'left':expand_left,
            'background-color':'white',
            'box-shadow':'0 0 6px 3px black'
        }, 300, function(){
            clone.addClass('content-item-clone-final');
        }).find('.content-item-tooltip').fadeOut(150);

        clone.find('.content-item-image').animate({
            //'width':'100%',
            //'margin-left':'10%',
            'height':'200px'
        },300);

        clone.append('<div class="expand-exit hidden"><i class="fas fa-times" style="vertical-align:top;"></i></div>');
        clone.find('.expand-exit').fadeIn(300);

        $('.overlay').fadeIn(300);
    }
});

var timer;
$('.content-item').mouseenter(function() {
    if(!checkBreakpoint('xs')){
        var that = this;
        timer = setTimeout(function(){
            $('#display-info').fadeIn(150);
            $(that).find('.content-item-tooltip').fadeIn(150);
        }, 300);
    }
}).mouseleave(function() {
    if(!checkBreakpoint('xs')) {
        clearTimeout(timer);
        $('#display-info').fadeOut(150);
        $(this).find('.content-item-tooltip').fadeOut(150);
    }
});

$('.overlay').click(function() {
    // $('.content-item').animate({
    //     'opacity':'1'
    // }, 300);

});

$(document).on('click', '.overlay, .expand-exit', function(){
    $('.content-item-clone').fadeOut(300);
    $('.overlay').fadeOut(300);
    $('body').removeClass('modal-open');
    project_open = false;
    setTimeout(function(){
        $('.content-item-clone').remove();
    }, 300);
});