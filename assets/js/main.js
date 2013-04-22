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


  // set up sign up forms
  var firebase = new Firebase('https://internproject.firebaseio.com/email-signup');

  function formatDate(d){
    function pad(n){return n<10 ? '0'+n : n};

    return pad(d.getMonth()+1)+'/'
    + pad(d.getDate())+'/'
    + d.getFullYear()+" "
    + pad(d.getHours()) + ":"
    + pad(d.getMinutes()) + ":"
    + pad(d.getSeconds());
  };

  $('button').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $text = $(this).parent().find('.email-signup-text'),
        $form = $(this).parent().parent(),
        email = $text.val();

    var loc = "unknown";
    try {
      loc = geoip_city() + ", " + geoip_region_name();
    } catch (e) {
      // we don't have the city yet, so let's not record it.
    }

    firebase.push({
      email: email,
      submit_time: formatDate(new Date()),
      location: loc
    }, function(error) {
      if (error !== null) {
        alert("ERROR: " + error);
      } else {
        $form.hide(0, function () {
          $form.parent().parent().find(".success-message").css("text-indent", 0).fadeIn("slow").delay(2E3).fadeOut("slow", function () {
            $form.fadeIn("slow");
            $text.val('');
          });
        });
      }
    });
  });
});
