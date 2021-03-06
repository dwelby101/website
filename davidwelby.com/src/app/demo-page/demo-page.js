
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
    $('.colourOverlay').css('background-image','linear-gradient(rgba('+ rgb1.join(',')+'), rgba('+rgb2.join(',')+'))');

    //set header colour to dynamic bg colour
    $('#header').css('background','rgba('+ rgb1.join(',')+')' );

}).resize();

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

