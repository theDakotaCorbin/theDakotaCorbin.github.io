$(document).ready(function () {

    var native_width = 0;
    var native_height = 0;

    //suggestion from @Jab2870 on CODEPEN
    $(".large").css("background", "url('" + $(".small").attr("src") + "') no-repeat");

    //Now the mousemove function
    $(".magnify").mousemove(function (e) {
        //When the user hovers on the image, the script will first calculate
        //the native dimensions if they don't exist. Only after the native dimensions
        //are available, the script will show the zoomed version.
        if (!native_width && !native_height) {
            //This will create a new image object with the same image as that in .small
            //We cannot directly get the dimensions from .small because of the 
            //width specified to 200px in the html. To get the actual dimensions we have
            //created this image object.
            var image_object = new Image();
            image_object.src = $(".small").attr("src");

            //This code is wrapped in the .load function which is important.
            //width and height of the object would return 0 if accessed before 
            //the image gets loaded.
            native_width = image_object.width;
            native_height = image_object.height;
        } else {
            //x/y coordinates of the mouse
            //This is the position of .magnify with respect to the document.
            var magnify_offset = $(this).offset();
            //We will deduct the positions of .magnify from the mouse positions with
            //respect to the document to get the mouse positions with respect to the 
            //container(.magnify)
            var mx = e.pageX - magnify_offset.left;
            var my = e.pageY - magnify_offset.top;

            //Finally the code to fade out the glass if the mouse is outside the container
            if (mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
                $(".large").fadeIn(200);
            } else {
                $(".large").fadeOut(200);
            }
            if ($(".large").is(":visible")) {
                //The background position of .large will be changed according to the position
                //of the mouse over the .small image. So we will get the ratio of the pixel
                //under the mouse pointer with respect to the image and use that to position the 
                //large image inside the magnifying glass
                var rx = Math.round(mx / $(".small").width() * native_width - $(".large").width() / 2) * -1;
                var ry = Math.round(my / $(".small").height() * native_height - $(".large").height() / 2) * -1;
                var bgp = rx + "px " + ry + "px";

                //Time to move the magnifying glass with the mouse
                var px = mx - $(".large").width() / 2;
                var py = my - $(".large").height() / 2;
                //Now the glass moves with the mouse
                //The logic is to deduct half of the glass's width and height from the 
                //mouse coordinates to place it with its center at the mouse coordinates

                //If you hover on the image now, you should see the magnifying glass in action
                $(".large").css({
                    left: px,
                    top: py,
                    backgroundPosition: bgp
                });
            }
        }
    })
})

$(document).ready(function () {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'media/party-music.mp3');

    //audioElement.load()

    $.get();

    audioElement.addEventListener("load", function () {
        audioElement.play();
    }, true);

    $('a.play').click(function () {
        audioElement.play();
    });

    $('a.pause').click(function () {
        audioElement.pause();
    });
});

$(function () {

    $('a.play').on('click', function () {

        $('img[name=rayBans]').removeClass('ng-hide')
        $('img[name=rayBans]').addClass('animated fadeInDownBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('fadeInDownBig')

            $('div[name=mainBG]').addClass('animated infinite flash')

            $('img.mainLogo').addClass('animated infinite shake')

        });

    });

    $('a.pause').on('click', function () {
        $('img[name=rayBans]').addClass('animated fadeOutUpBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('fadeOutUpBig')
            $(this).addClass('ng-hide')
            $('div[name=mainBG]').removeClass('animated infinite flash')
            $('img.mainLogo').removeClass('animated infinite shake')

            $('img.look').addClass('animated bounce')

        });

    });

});

$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});