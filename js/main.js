;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};



	var parallax = function() {
		if ( !isMobile.any()) {
			$(window).stellar();
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('body').hasClass('offcanvas') ) {
    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};

	

	var header = function() {
		$(window).scroll(function(){
			var st = $(window).scrollTop();
			if (st > 50) {
				$('.gtco-nav').addClass('scrolled');
			} else {
				$('.gtco-nav').removeClass('scrolled');
			}
		});
   
	};

	var navigation = function() {

		$('body').on('click', '#gtco-offcanvas ul a:not([class="external"]), .main-nav a:not([class="external"])', function(event){
			var section = $(this).data('nav-section');
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500, 'easeInOutExpo');
			   }

			   if ($('body').hasClass('offcanvas')) {
			   	$('body').removeClass('offcanvas');
			   	$('.js-gtco-nav-toggle').removeClass('active');
			   }
		   event.preventDefault();
		   return false;
		});

	};


	var offcanvasMenu = function() {

		$('body').prepend('<div id="gtco-offcanvas" />');
		$('body').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.main-nav > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			} else {
				$('body').addClass('offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	


	
	$(function(){
		parallax();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
	});

	// MDB Lightbox Init
	$(function () {
		$("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
	});

	// $(document).ready(function() {
	//
	// 	// required elements
	// 	var imgPopup = $('.img-popup');
	// 	var imgCont  = $('.container__img-holder');
	// 	var popupImage = $('.img-popup img');
	// 	var closeBtn = $('.close-btn');
	//
	// 	// handle events
	// 	imgCont.on('click', function() {
	// 		var img_src = $(this).children('img').attr('src');
	// 		imgPopup.children('img').attr('src', img_src);
	// 		imgPopup.addClass('opened');
	// 	});
	//
	// 	$(imgPopup, closeBtn).on('click', function() {
	// 		imgPopup.removeClass('opened');
	// 		imgPopup.children('img').attr('src', '');
	// 	});
	//
	// 	popupImage.on('click', function(e) {
	// 		e.stopPropagation();
	// 	});
	//
	// });

	function isValidEmailAddress(emailAddress) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	}

	var SendMail = function () {

		var emailVal = jQuery('#contact-email').val();

		if (isValidEmailAddress(emailVal)) {
			var params = {
				'action': 'SendMessage',
				'name': jQuery('#name').val(),
				'email': jQuery('#contact-email').val(),
				'subject': jQuery('#subject').val(),
				'message': jQuery('#message').val()
			};
			jQuery.ajax({
				type: "POST",
				url: "php/sendMail.php",
				data: params,
				success: function (response) {
					if (response) {
						var responseObj = jQuery.parseJSON(response);
						if (responseObj.ResponseData)
						{
							alert(responseObj.ResponseData);
						}
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					//xhr.status : 404, 303, 501...
					var error = null;
					switch (xhr.status)
					{
						case "301":
							error = "Redirection Error!";
							break;
						case "307":
							error = "Error, temporary server redirection!";
							break;
						case "400":
							error = "Bad request!";
							break;
						case "404":
							error = "Page not found!";
							break;
						case "500":
							error = "Server is currently unavailable!";
							break;
						default:
							error = "Unespected error, please try again later.";
					}
					if (error) {
						alert(error);
					}
				}
			});
		} else
		{
			alert('Su email no tiene un formato válido');
		}
	};

}());

