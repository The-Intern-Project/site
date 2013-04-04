jQuery(document).ready(function ($) {

    $('.img-frame').hover(function(){
        $(this).find('.mouse-effect').stop().animate({'opacity':'0.6'});
        $(this).find('.extra-links').stop().animate({'top':'50%'});
    },function(){
        $(this).find('.mouse-effect').stop().animate({'opacity':'0'});
        $(this).find('.extra-links').stop().animate({'top':'-50%'});
    });

    var currentCategory = $('.t_line_view').find('.selected').data('category'),
        $postItems = $('.post-item');
});