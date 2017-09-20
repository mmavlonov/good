jQuery(function ($) {
    "use strict";
    var workedAnimateCounter = false,
        language = $("[data-localize]").defaultLanguage;

    /*var pathname = window.location.href; // Returns path only
     console.log(pathname);*/

    /**
     * Language scripts
     */
    $(".tj").click(function () {
        changeLanguage('tj');
    });
    $(".ru").click(function () {
        changeLanguage('ru');
    });
    $(".en").click(function () {
        changeLanguage('en');
    });

    // get default language
    changeLanguage($("[data-localize]").defaultLanguage);

    function changeLanguage(lang) {
        var langs = ['en', 'ru', 'tj'],
            index = langs.indexOf(lang);
        if (index) {
            var k = langs[0];
            langs[0] = langs[index];
            langs[index] = k;
        }
        if (typeof(Storage) !== "undefined") {
            localStorage.language = lang;
        }
        language = lang;
        //if(revapi) revapi.revnext(2);
        $("[data-localize]").localize("local", {language: langs[0], pathPrefix: "./localization"});
    }

    /* page loader*/
    $(window).load(function () {
        // Animate loader off screen
        $(".loader").fadeOut("slow");
    });
    //scroll sections
    $(".scroll").click(function (event) {
        var height = $("nav").height() - 25;
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - height
        }, 1000);
    });
    // full screen side nav
    $('.side-menu-button').on('click', function () {
        $('.sidenav').toggleClass("mySideBar");
        $(this).toggleClass("actives");
        $('.side-menu-button > i').toggleClass("fa-bars");
        $('.side-menu-button > i').toggleClass("fa-times");
    });
    $('.sidenav ul >li a').on('click', function () {
        $('.sidenav').removeClass("mySideBar");
        $('.side-menu-button').removeClass("actives");
        $('.side-menu-button > i').toggleClass("fa-bars");
        $('.side-menu-button > i').toggleClass("fa-times");
    });
    //scroll nav colors
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 70) { // Set position from top to add class
            $('.navbar').addClass("shrink");
            $('.page-2 .navbar-brand> img').attr('src', 'img/logo_white.png');
        } else {
            $('.navbar').removeClass("shrink");
            $('.page-2 .navbar-brand> img').attr('src', 'img/logo_white.png');
        }

        var counterTop = $("#counters").offset().top - $("#counters").height() - 200;
        if ($(this).scrollTop() > counterTop) {
            if (!workedAnimateCounter) {
                workedAnimateCounter = true;
                incrementalNumber();
            }
        }
    });
    //revoulution slider
    var revapi = $("#slider1").revolution({
        sliderType: "standard"
        , sliderLayout: "fullscreen"
        , delay: 9000
        , navigation: {
            arrows: {
                enable: true
            }
            , touch: {
                touchenabled: "on"
                , swipe_threshold: 75
                , swipe_min_touches: 1
                , swipe_direction: "horizontal"
                , drag_block_vertical: false
            }
        }
        , responsiveLevels: [2048, 1024, 778, 680]
        , gridwidth: 1170
        , gridheight: 720
    });
    //what-we-do mobile slider
    $("#mobile-slider").owlCarousel({
        slideSpeed: 300
        , singleItem: true
        , pagination: false
        , navigation: false, // Show next and prev buttons
        autoPlay: 3000
    });
    //slider for the blog
    $("#blog-slider").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 3
        , itemsDesktop: [1199, 3]
        , itemsDesktopSmall: [992, 2]
        , stopOnHover: true
    });
    //owl slider for portfolio section
    $("#owl-demo").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 3
        , itemsDesktop: [1199, 3]
        , itemsDesktopSmall: [979, 3]
    });
    //blog text slider
    $("#blog-text-slider").owlCarousel({
        pagination: true
        , slideSpeed: 300
        , paginationSpeed: 400
        , singleItem: true
        , transitionStyle: "fade"
    });
    //Happy Client Slider
    $("#owl-slider").owlCarousel({
        pagination: true
        , slideSpeed: 300
        , paginationSpeed: 400
        , singleItem: true
        , transitionStyle: "fade"
    });
    //wow .js
    if ($(window).width() > 767) {
        new WOW().init();
    }

    //animation
    //for our work numbers scroll
    function incrementalNumber() {
        var rt = {
            item: '.incrementalNumber'
            , value: 'data-value'
            , bigNumber: 'big-number'
            , setText: 'set-text'
            , setTime: 'set-time'
        };
        var numberTimers = [];
        var numberStarts = [];
        var autoincrementNumber = function (i, where, number) {
            var numberTime;
            var setTime = where.attr(rt.setTime);
            (setTime != "" && setTime !== undefined) ? numberTime = parseInt(setTime) / number : numberTime = 1000 / number;
            var bigNumber = where.attr(rt.bigNumber);
            (bigNumber != "" && bigNumber !== undefined) ? numberStarts[i] = parseInt(bigNumber) : (typeof bigNumber !== typeof undefined && bigNumber !== false) ? numberStarts[i] = Math.round(number - (number / 10)) : numberStarts[i] = 0;
            var setText = where.attr(rt.setText);
            numberTimers[i] = setInterval(function () {
                numberStarts[i]++;
                (numberStarts[i] <= number) ? where.html((setText !== undefined) ? numberStarts[i] + setText : numberStarts[i]) : clearInterval(numberTimers[i])
            }, numberTime);
        };
        $.each($(rt.item), function (index, value) {
            var data = $(this).attr(rt.value);
            autoincrementNumber(numberTimers.length, $(this), data);
        });
    }

    //fancy box for portfolio
    $(".fancy-box").fancybox({
        helpers: {
            title: {
                type: 'float'
            }
        },
        beforeShow: function () {
            this.title = '<a target="_blank" href="http://' + this.title + '">' + this.title + '</a>';
        }
    });


    //progress bar
    $(".progress-bar").each(function () {
        $(this).appear(function () {
            $(this).animate({width: $(this).attr("aria-valuenow") + "%"}, 3000)
        });
    });

    //Our team resposive tabs
    $('#responsiveTabsDemo').responsiveTabs({
        startCollapsed: 'tabs'
        , animation: 'fade'
    });
    if ($('#map').length) {
        //Contact Map
        var map;
        map = new GMaps({
            el: '#map',
            lat: 40.300204,
            lng: 69.615269,
            scrollwheel: false
        });
        map.drawOverlay({
            lat: map.getCenter().lat(),
            lng: map.getCenter().lng(),
            layer: 'overlayLayer',
            content: '<div class="overlay_map"><div class="pin bounce"></div><div class="overlay_arrow above"></div></div>',
            verticalAlign: 'top',
            horizontalAlign: 'center'
        });
    }


    //Contact Us
    $("#submit_btn").click(function () {
        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_telephone = $('input[name=phone]').val();
        var user_message = $('textarea[name=message]').val();

        //simple validation at client's end
        var post_data, output;
        var proceed = true;
        if (user_name == "") {
            proceed = false;
        }
        if (user_email == "") {
            proceed = false;
        }
        if (user_message == "") {
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userTelephone': user_telephone,
                'userMessage': user_message
            };

            //Ajax post data to server
            $.post('php/contact.php', post_data, function (response) {

                //load json data from server and output message
                if (response['valid'] == false) {
                    output = "<div class='alert-danger' style='padding:10px; margin-bottom:25px;'>" + response['msg'] + "</div>";
                } else {
                    output = "<div class='alert-success' style='padding:10px; margin-bottom:25px;'>" + response['msg'] + "</div>";

                    //reset values in all input fields
                    $('#form-elements input').val('');
                    $('#form-elements textarea').val('');
                }

                $("#result").hide().html(output).slideDown();
            }, 'json');

        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#form-elements input, #form-elements textarea").keyup(function () {
        $("#result").slideUp();
    });
});