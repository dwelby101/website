/***********************************************
 * GLOBAL VARIABLES
 ***********************************************/


/***********************************************
 * Function for the responsive menu
 ***********************************************/
(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        //toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(this, this.document));


/***********************************************
 * Function for giving a parallax effect on the splash page
 * based on the scroll position of the page
 ***********************************************/
$('div.parallax').each(function() {
    var $obj = $(this);

    $(window).scroll(function () {

        var scrollPos= -$(window).scrollTop();
        var splashTop = $('#about-me').offset().top + scrollPos;

        //only do it when it can be seen
        if(splashTop >= 0) {
            var yPos = -($(window).scrollTop() / $obj.data('speed'));
            var bgpos = '50% ' + yPos + 'px';

            if ($obj.attr('id') === 'splash') {
                $obj.css('top', yPos);
            }
            else {
                $obj.css('background-position', bgpos);
            }
        }
    });
});


/***********************************************
 * Function for getting the width and height
 * of the window
 ***********************************************/
var $win = $(window),
    w = 0,h = 0,
    getWidth = function() {
        w = $win.width();
        h = $win.height();
    };

/***********************************************
 * Function for changing the overlay colours of
 * the menu and background image
 * &
 * for showing the top menu based on mouseY position
 ***********************************************/
$win.resize(getWidth).mousemove(function(e) {

    rgb1 = [
        Math.round(e.pageX/w * 255),
        Math.round(e.pageY/h * 255),
        150,
        0.5
    ];

    rgb2 = [
        Math.round(e.pageX/w * 50),
        Math.round(e.pageY/h * 50),
        150,
        0.5
    ];


    //make sure works in all browsers - see bookmark called dynamic gradient
    $('#colourOverlay').css('background-image','linear-gradient(rgba('+ rgb1.join(',')+'), rgba('+rgb2.join(',')+'))');

    //set header colour to dynamic bg colour
    $('#header').css('background','rgba('+ rgb1.join(',')+')' );


}).resize();



/***********************************************
 * Function for animating page to menu item that
 * was clicked
 ***********************************************/
function getId(str) {
    return str.split('#')[1];
}

$('a[href^="#"]').on('click', function(event) {

    var target = getId(this.href);//$(this.href);
    target = $('#'+target);



    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});



/***********************************************
 * Function for toggling the more-skills area
 ***********************************************/
function moreSkills(buttonId)  {
    //change the text in the button
    var text = document.getElementById(buttonId).firstChild;

    if(text.data == "More Skills" ) {
        setTimeout(function () {
            $('html,body').animate({scrollTop: $('#moreSkillsCtnr').offset().top}, 800);
        }, 500);
    }
    else{
        setTimeout(function () {
            $('html,body').animate({scrollTop: $('#cpp').offset().top}, 800);
        }, 500);
    }


    text.data = text.data == "More Skills" ? "Less Skills" : "More Skills";

    //toggle the div
    $('#moreSkillsCtnr').slideToggle("slow");

}

function scrollToTop() {
    $("html, body").animate({scrollTop: 0}, "slow");
}


/***********************************************
 * Function for initializing the google map
 ***********************************************/
/*
function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(51.5286416, -0.1015987),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.LONDONMAP,
        disableDefaultUI: true
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
*/
console.log(10+"20");