//Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Collapsing navbar
var autocollapse = function (menu,maxHeight) {
    
    var nav = $(menu);
    var navHeight = nav.innerHeight();
    if (navHeight >= maxHeight) {
        
        $(menu + ' .dropdown').removeClass('d-none');
        $(".navbar-nav").removeClass('w-auto').addClass("w-100");
        
        while (navHeight > maxHeight) {
            //  add child to dropdown
            var children = nav.children(menu + ' li:not(:last-child)');
            var count = children.length;
            $(children[count - 1]).prependTo(menu + ' .dropdown-menu');
            navHeight = nav.innerHeight();
        }
        $(".navbar-nav").addClass("w-auto").removeClass('w-100');
        
    }
    else {
        
        var collapsed = $(menu + ' .dropdown-menu').children(menu + ' li');
      
        if (collapsed.length===0) {
          $(menu + ' .dropdown').addClass('d-none');
        }
      
        while (navHeight < maxHeight && (nav.children(menu + ' li').length > 0) && collapsed.length > 0) {
            //  remove child from dropdown
            //TODO: if only one child is in the drop-down remove it and check height again
            // if height is not ok, then remove it and proceed
            collapsed = $(menu + ' .dropdown-menu').children('li');
            $(collapsed[0]).insertBefore(nav.children(menu + ' li:last-child'));
            navHeight = nav.innerHeight();
        }
        //TODO: if dropdown is empty, hide last child

        if (navHeight > maxHeight) { 
            autocollapse(menu,maxHeight);
        }
        
    }
};

// Iframe
$(document).ready(function () {
    if( window.location.search.indexOf("iframe") > -1 ) {
        $('#mobile-navbar').remove();
        $('a.navbar-brand').hide();
        $('button.navbar-toggler').hide();
        $( '#desktop-navbar' ).removeClass( 'bg-dark d-none d-sm-block' ).addClass( 'justify-content-center nav-iframe' );
        // $( '#nav' ).addClass( 'mx-auto' )
        $('a').each(function(i,e) {
            if (e != window.undefined && !e.target) {
                if (e.href.indexOf(location.hostname) > -1) {
                    e.href = e.href+"?iframe"
                }
            }
        });
    }

    // when the page loads
    autocollapse('#nav',50); 
    
    // when the window is resized
    $(window).on('resize', function () {
        autocollapse('#nav',50); 
    });


});


$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.navbar').addClass('shrink');
  } else {
    $('.navbar').removeClass('shrink');
  }
});


// //Anchors animation
// $('a.page-scroll').bind('click', function(event) {
//     var $anchor = $(this);
//     let element = $($anchor.attr('href').replace(" ","\ "));
//     if (element.length > 0) {
//       let dest = (element.offset().top - 240);
//       $('html, body').stop().animate({
//           scrollTop: dest
//       }, 1250, 'easeInOutExpo');
//       event.preventDefault();
//     }
// });