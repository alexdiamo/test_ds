$(document).ready(function(e) {
	var $galleryMain = $('.slider__main-slide img'),
		$galleryAdd = $('.slider__additional-slide img'),
		$numbers = $('.slider__number span'),
		$description = $('.slider__description div');

	var len = $galleryMain.length,
		index,
        count = 0,
        autoplay = 0;

    function nextSlide() {
        index = Math.abs(len - (count % len) - 1);
        count++;
        
        $galleryAdd.eq(index).fadeOut(function(e) {
            $galleryAdd.eq((index + 1) % len).show();
            $galleryAdd.eq((index - 1) % len).css({
                'z-index': count
            });
            
            $galleryMain.eq(index).fadeOut(function(e) {
                $galleryMain.eq((index + 1) % len).show();
                $galleryMain.eq((index - 1) % len).css({
                    'z-index': count
                });
            });

            $description.eq(index).fadeOut(function(e) {
                $description.eq((index + 1) % len).show();
                $description.eq((index - 1) % len).css({
                    'z-index': count
                });
            });

            $numbers.eq((count % len + 1) % len).css({
                'color': '#d4d4d4'
            })
            $numbers.eq((count % len - 1) % len).css({
                'color': '#d4d4d4'
            })
            $numbers.eq(count % len).css({
                'color': '#2c2e37'
            })
        });
    };

    function prevSlide() {
        index = Math.abs(count % len);
        count++;
        
        $galleryMain.eq(index).css({
            'z-index': count,
            'display': 'none'
        });

        $galleryMain.eq(index).fadeIn(function(e) {
            $galleryAdd.eq(index).css({
                'z-index': count,
                'display': 'none'
            });
            $galleryAdd.eq(index).fadeIn();
        });

        $description.eq(index).css({
            'z-index': count,
            'display': 'none'
        });
        $description.eq(index).fadeIn();

        $numbers.eq((Math.abs(index - 2) + 1) % len).css({
            'color': '#d4d4d4'
        })
        $numbers.eq((Math.abs(index - 2) - 1) % len).css({
            'color': '#d4d4d4'
        })
        $numbers.eq(Math.abs(index - 2)).css({
            'color': '#2c2e37'
        })
    }

    function runLogos() {
        $('.logos__inner').clone().appendTo('.logos__outer');

        var counter = 0,
            logosWidth = document.querySelector('.logos__inner').offsetWidth;

        var intervalId = setInterval(function() {
            counter += 2;

            $('.logos__inner').css({
                'transform': 'translateX(-' + counter + 'px)'
            })

            if (counter % logosWidth == 0 || counter >= logosWidth) {
                $('.logos__inner').detach(':nth-child(1)');
                clearInterval(intervalId);
                runLogos();
            }
        }, 30);
    }

    // ---------- EVENTS ----------
	$('.slider__arrow_next').on('click', function(e) {
		nextSlide();
	});

	$('.slider__arrow_prev').on('click', function(e) {
		prevSlide();
	});

    $('.slider__autoplay').on('click', function(e) {
        if (autoplay == 0) {
            autoplay = 1;
            nextSlide();
            var intervalId = setInterval(function() {
                if (autoplay == 0) {
                    clearInterval(intervalId);
                } else {
                    nextSlide();
                }
            }, 3000);
        } else {
            autoplay = 0;
        }
    });

    $('.header__menu').on('click', function(e) {
        $('.menu').slideDown();
    });

    $('.menu__close').on('click', function(e) {
        $('.menu').slideUp();
    });

    $('.to-about').on('click', function (event) {        
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });   

    runLogos(); 
});