(function($) {
    'use strict';
    $(document).ready(function() {
        $(window).load(function() {
            $('#preloader').fadeOut();
            $('body').delay(350).css({
                'overflow': 'visible'
            });
        })
        $(window).scroll(function() {
            if ($(window).scrollTop() > 1000) {
                $('a.top').fadeIn('slow');
            } else {
                $('a.top').fadeOut('slow');
            }
        });
        $('.item img').selectable();
        $('[data-toggle="tooltip"]').tooltip()
        var winWidth = $('body').width();
        if (winWidth <= 1024) {
            $('#menu .navbar-nav li a').attr('data-toggle', 'collapse');
            $('#menu .navbar-nav li a').attr('data-target', '#menu');
            $('nav a[href^=#], a.top[href^=#], a.smooth[href^=#]').on("click", function(event) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top - 470
                }, 1000);
            });
            $('#menu .sub-nav').hide();
            // $('#menu li.sub').prepend('<span class="clicks"><i class="fa fa-chevron-down"></i></span>');
            $('#menu li.sub span').on('click', function() {
                $(this).next().next().slideToggle(300);
            });
        } else {
            $('nav a[href^=#], a.top[href^=#], a.smooth[href^=#]').on("click", function(event) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top - 0
                }, 1000);
            });
        }
        var cbpAnimatedHeader = (function() {
            var docElem = document.documentElement,
                header = document.querySelector('.cbp-af-header'),
                didScroll = false,
                changeHeaderOn = 150;

            function init() {
                window.addEventListener('scroll', function(event) {
                    if (!didScroll) {
                        didScroll = true;
                        setTimeout(scrollPage, 250);
                    }
                }, false);
            }

            // function scrollPage() {
            //     var sy = scrollY();
            //     if (sy >= changeHeaderOn) {
            //         classie.add(header, 'cbp-af-header-shrink');
            //     } else {
            //         classie.remove(header, 'cbp-af-header-shrink');
            //     }
            //     didScroll = false;
            // }

            function scrollY() {
                return window.pageYOffset || docElem.scrollTop;
            }
            init();
        })();
        $('.stat .timer').waypoint(function() {
            $('.timer').countTo();
        }, {
            offset: '90%'
        });
        $('#datetimepicker').datetimepicker({
            format: 'm.d.Y H:i',
            inline: false,
            lang: 'en'
        });
        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            overlay_gallery: true
        });
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        })
        wow.init();
        $('.panel-title a').on("click", (function() {
            var thisParent = $(this).parent().parent().next();
            if (thisParent.hasClass('in')) {
                $(this).parent().removeClass('active');
            } else {
                $('.panel-title').removeClass('active');
                $(this).parent().addClass('active');
            }
        }));
        $('.recent-project .bxslider, #services-single .bxslider, .blog .bxslider, .single-post .bxslider').bxSlider({
            speed: 1000,
            auto: true,
            pause: 8000,
            pager: false,
            mode: 'fade',
            captions: true,
            autoHover: true,
            adaptiveHeight: true,
            nextText: '<i class="fa fa-angle-right square BGprime"></i>',
            prevText: '<i class="fa fa-angle-left square BGprime"></i>'
        });
        $('#testimonials .bxslider').bxSlider({
            speed: 1000,
            auto: true,
            pause: 8000,
            pager: true,
            mode: 'fade',
            adaptiveHeight: true,
            controls: false
        });
        $('.slider4').bxSlider({
            slideWidth: 175,
            auto: true,
            minSlides: 2,
            maxSlides: 3,
            moveSlides: 1,
            slideMargin: 15,
            controls: false,
            pager: false,
            pause: 5000,
            speed: 1500,
        });
        var owl = $("#owl-recent-project");
        owl.owlCarousel({
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 3],
                [1200, 3],
                [1400, 4],
                [1600, 4]
            ],
            navigation: false,
            controls: false
        });
        var $grid = $('.grid').isotope({
            itemSelector: '.item',
            masonry: {}
        });
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });
        $('.filter-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        $('.button-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function() {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
        $("#subscribeForm input").on("focus", (function() {
            $(this).prev("label").hide();
            $(this).prev().prev("label").hide();
        }));
        $("#subscribeForm").submit(function() {
            var emailSubscribe = $("#emailSubscribe").val();
            if (emailSubscribe == "") {
                $('#emailSubscribe').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#emailSubscribe').fadeIn(400);
                $("#emailSubscribe").on("focus", (function() {
                    $('#emailSubscribe').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            } else if (emailSubscribe.indexOf('@') == -1 || emailSubscribe.indexOf('.') == -1) {
                $('#emailSubscribe').addClass('reqfld');
                $('<span class="error" style="display:none;  color:#f30">Invalid!</span>').insertBefore('#emailSubscribe').fadeIn(400);
                $("#emailSubscribe").on("focus", (function() {
                    $('#emailSubscribe').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var sub_security = $("#sub-security").val();
            var dataString = '&emailSubscribe=' + emailSubscribe + '&sub-security=' + sub_security;
            $.ajax({
                type: "POST",
                url: "form/subscribe.php",
                data: dataString,
                success: function() {
                    $("#subscribeForm .form-row").hide();
                    $('#subscribeForm').append("<div id='subscribesuccess' class='alert alert-success' style='border:#" + sub_successBox_Border_Color + " 1px " + sub_successBoxBorderStyle + "; background:#" + sub_successBoxColor + ";' ></div>");
                    $('#subscribesuccess').html("<h5 class='text-center' style='color:#" + sub_textColor + ";'><i class='fa fa-check-circle'></i> " + sub_submitMessage + "</h5>").hide().delay(300).fadeIn(1500);
                    $('#subscribeForm .form-row').delay(6000).slideUp('fast');
                }
            });
            return false;
        });
        $('.loader').hide();
        $("#contact_form").submit(function() {
            var name = $("#name").val();
            if (name == "") {
                $('#name').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#name').fadeIn(400);
                $("#name").on("focus", (function() {
                    $('#name').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var phone = $("#phone").val();
            if (phone == "") {
                $('#phone').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#phone').fadeIn(400);
                $("#phone").on("focus", (function() {
                    $('#phone').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var email = $("#email").val();
            if (email == "") {
                $('#email').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#email').fadeIn(400);
                $("#email").on("focus", (function() {
                    $('#email').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
                $('#email').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#email').fadeIn(400);
                $("#email").on("focus", (function() {
                    $('#email').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var datetimepicker = $("#datetimepicker").val();
            if (datetimepicker == "") {
                $('#datetimepicker').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#datetimepicker').fadeIn(400);
                $("#datetimepicker").on("focus", (function() {
                    $('#datetimepicker').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var comment = $("#comment").val();
            if (comment == "") {
                $('#comment').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#comment').fadeIn(400);
                $("#comment").on("focus", (function() {
                    $('#comment').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            $('#contact_form').animate({
                opacity: '0.3'
            }, 500);
            var security = $("#security").val();
            var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&datetimepicker=' + datetimepicker + '&comment=' + comment + '&security=' + security;
            $.ajax({
                type: "POST",
                url: "form/contact.php",
                data: dataString,
                success: function() {
                    $("#contact_form").animate({
                        opacity: '1'
                    }, 500);
                    $('.loader').hide();
                    $("<div id='success' class='alert alert-success' style='border:#" + successBox_Border_Color + " 1px " + successBoxBorderStyle + "; background:#" + successBoxColor + ";' ></div>").insertAfter('#contact_form');
                    $('#contact_form').slideUp(300);
                    $('#success').html("<h5 style='color:#" + textColor + ";'>" + submitMessage + "</h5><p style='color:#" + textColor + ";'>" + successParagraph + "</p>").hide().delay(300).fadeIn(1500);
                }
            });
            return false;
        });
        $('.loader').hide();
        $("#Qcontact_form").submit(function() {
            var qname = $("#qname").val();
            if (qname == "") {
                $('#qname').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#qname').fadeIn(400);
                $("#qname").on("focus", (function() {
                    $('#qname').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var qphone = $("#qphone").val();
            if (qphone == "") {
                $('#qphone').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#qphone').fadeIn(400);
                $("#qphone").on("focus", (function() {
                    $('#qphone').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var qemail = $("#qemail").val();
            if (qemail == "") {
                $('#qemail').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#qemail').fadeIn(400);
                $("#qemail").on("focus", (function() {
                    $('#qemail').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            } else if (qemail.indexOf('@') == -1 || qemail.indexOf('.') == -1) {
                $('#qemail').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#qemail').fadeIn(400);
                $("#qemail").on("focus", (function() {
                    $('#qemail').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            var qcomment = $("#qcomment").val();
            if (qcomment == "") {
                $('#qcomment').addClass('reqfld');
                $('<span class="error" style="display:none; color: #F30;"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#qcomment').fadeIn(400);
                $("#qcomment").on("focus", (function() {
                    $('#qcomment').removeClass('reqfld');
                    $(this).prev().fadeOut(400);
                }));
                return false;
            }
            $('#Qcontact_form').animate({
                opacity: '0.3'
            }, 500);
            var qsecurity = $("#qsecurity").val();
            var dataString = 'qname=' + qname + '&qemail=' + qemail + '&qphone=' + qphone + '&qcomment=' + qcomment + '&qsecurity=' + qsecurity;
            $.ajax({
                type: "POST",
                url: "form/question.php",
                data: dataString,
                success: function() {
                    $("#Qcontact_form").animate({
                        opacity: '1'
                    }, 500);
                    $('.loader').hide();
                    $("<div id='success' class='alert alert-success' style='border:#" + successBox_Border_Color + " 1px " + successBoxBorderStyle + "; background:#" + successBoxColor + ";' ></div>").insertAfter('#Qcontact_form');
                    $('#Qcontact_form').slideUp(300);
                    $('#success').html("<h5 style='color:#" + textColor + ";'>" + submitMessage + "</h5><p style='color:#" + textColor + ";'>" + successParagraph + "</p>").hide().delay(300).fadeIn(1500);
                }
            });
            return false;
        });
    });
}(jQuery));

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
    var markers = [
        ['Los Angeles, USA', 33.9205022, -118.2472962],
        ['London, UK', 51.5135917, -0.14125609999996414],
        ['Moscow, Russia', 55.57452, 42.00816199999997]
    ];
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<h5>Striking<small>Los Angeles</small></h5>' +
            '<p>Call Us: <strong>123-456-7890</p>' + '</div>'
        ],
        ['<div class="info_content">' +
            '<h5>Striking<small>London</small></h5>' +
            '<p>Call Us: <strong>123-456-7890</p>' + '</div>'
        ],
        ['<div class="info_content">' +
            '<h5>Striking<small>Moscow</small></h5>' +
            '<p>Call Us: <strong>123-456-7890</p>' + '</div>'
        ]
    ];
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        map.fitBounds(bounds);
    }
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });
}

function changeHTML1() {
  document.getElementById("changeMe").innerHTML = "Our Bedroom Designs";
}
function changeHTML2() {
    document.getElementById("changeMe").innerHTML = "Our Bathroom Designs";
}
function changeHTML3() {
    document.getElementById("changeMe").innerHTML = "Explore Modular Kitchens";
}
function changeHTML4() {
    document.getElementById("changeMe").innerHTML = "Living Rooms Designed by us";
}
function changeHTML5() {
    document.getElementById("changeMe").innerHTML = "Our Home Office Collection";
}

function changeImage1() {
    document.getElementById("myImage1").src = "images/project/recent-home/bed1.jpg";
    document.getElementById("myImage2").src = "images/project/recent-home/bed2.jpg";
    document.getElementById("myImage3").src = "images/project/recent-home/bed3.jpg";
    document.getElementById("myImage4").src = "images/project/recent-home/bed4.jpg";
    
    // if (image1.src.match("images/project/recent-home/01.jpg") ){
    //   image1.src = "images/project/recent-home/bed1.jpg";
    // } else {
    //   image1.src = "images/project/recent-home/01.jpg";
    // }
    // if (image2.src.match("images/project/recent-home/02.jpg") ){
    //     image2.src = "images/project/recent-home/bed2.jpg";
    //   } else {
    //     image2.src = "images/project/recent-home/02.jpg";
    //   }
    // if (image3.src.match("images/project/recent-home/03.jpg") ){
    //     image3.src = "images/project/recent-home/bed3.jpg";
    //   } else {
    //     image3.src = "images/project/recent-home/03.jpg";
    //   }
    // if (image4.src.match("images/project/recent-home/04.jpg") ){
    //     image4.src = "images/project/recent-home/bed4.jpg";
    //   } else {
    //     image4.src = "images/project/recent-home/04.jpg";
    //   }

  }

function changeImage2() {
    document.getElementById("myImage1").src = "images/project/recent-home/sofa1.jpg";
    document.getElementById("myImage2").src = "images/project/recent-home/sofa2.jpg";
    document.getElementById("myImage3").src = "images/project/recent-home/sofa3.jpg";
    document.getElementById("myImage4").src = "images/project/recent-home/sofa4.jpg";
  }

  function changeImage3() {
    document.getElementById("myImage1").src = "images/project/recent-home/off-fur1.jpg";
    document.getElementById("myImage2").src = "images/project/recent-home/off-fur2.jpg";
    document.getElementById("myImage3").src = "images/project/recent-home/off-fur3.jpg";
    document.getElementById("myImage4").src = "images/project/recent-home/off-fur4.jpg";
  }

  function changeImage4() {
    document.getElementById("myImage1").src = "images/project/recent-home/dt1.jpg";
    document.getElementById("myImage2").src = "images/project/recent-home/dt2.jpg";
    document.getElementById("myImage3").src = "images/project/recent-home/dt3.jpg";
    document.getElementById("myImage4").src = "images/project/recent-home/dt4.jpg";

  }

  
  const form = document.getElementById('contact-form');

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
			const phone = document.getElementById('phone').value;
			const message = document.getElementById('message').value;

			if (name === '' || phone === '' || message === '') {
				alert('Please fill in all fields.');
				return;
			}

			const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
			const whatsappUrl = `https://wa.me/+919026566666?text=${whatsappMessage}`;

            // name.value = '';
            // phone.value = '';
            // message.value = '';

			// window.location.href = whatsappUrl;
            window.open(whatsappUrl,"_blank");
            window.location.reload();

            

            
            
		});


let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");
hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});


    


    
 
  
