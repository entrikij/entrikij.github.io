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

        clone.toggleClass('invisible content-item content-item-clone').appendTo("body").css({
            'position':'fixed',
            'top':offset.top,
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
        });

        clone.find('.content-item-image').animate({
            //'width':'100%',
            //'margin-left':'10%',
            'height':'200px'
        },300);

        $('.overlay').fadeIn(300);
    }
});

$('.overlay').click(function() {
    $('.content-item-clone').fadeOut(300);
    $(this).fadeOut(300);
    $('body').removeClass('modal-open');
    project_open = false;
    setTimeout(function(){
        $('.content-item-clone').remove();
    }, 300);
});