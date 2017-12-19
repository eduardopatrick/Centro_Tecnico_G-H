/* BTN EFFECT RIPPLE PLUGIN */
(function($) {
	"use strict";
	
	var AquaObj = {
		tb_featured_video:function(){
			var _light_box_video = $('#ro-play-button');
			if( _light_box_video.length === 0 ) return;
			 $('[data-toggle="tooltip"]').tooltip();
			var _template = '<div class="tb-overlay-bg"><div class="tb-overlay-container"><div class="tb-overlay-content"><div class="tb-iframe-scaler"><iframe class=" mfp-iframe" =""="" src="//www.youtube.com/embed/VIDEOID?autoplay=1" frameborder="0" allowfullscreen=""></iframe></div></div></div></div>';
			_light_box_video.on('click', function(e){
				e.preventDefault();
				var id = AquaObj.get_video_id( $(this).attr('href') );
				if(  id.length > 0 ){
					_template = _template.replace( 'VIDEOID', id );
					$('body').append(_template).find('.tb-overlay-bg').fadeIn(200);
				}
			});
			AquaObj.tb_close_overlay();
		},
		tb_close_overlay: function(){
			$('body').on('click','.tb-overlay-content', function(e){
				e.stopPropagation();
			}).on('click','.tb-overlay-container', function(){
				$(this).parent().fadeOut( function(){
					$(this).remove();
				});
			})
		},
		get_video_id:function(url){
			var id = url.match( /^.*?(?:player.|www.)?(?:vimeo\.com|youtu(?:be\.com|\.be))\/(?:video\/|embed\/|watch\?v=)?([A-Za-z0-9._%-]*)(?:\&\S+)?/ );
			return id[1];
		},
		tb_gallery_grid: function(){
			$( '#gallery_grid_widget' ).gridrotator( {
				rows			: 2,
				columns			: 3,
				animType		: 'fadeInOut',
				animSpeed		: 500,
				animEasingOut	: 'linear',
				animEasingIn	: 'linear',
				interval		: 3000,
				slideshow		: true,
				onhover		: false,
				w1024			: {
					rows	: 2,
					columns	: 3
				},

				w768			: {
					rows	: 2,
					columns	: 3
				},

				w480			: {
					rows	: 2,
					columns	: 3
				},

				w320			: {
					rows	: 2,
					columns	: 3
				},

				w240			: {
					rows	: 2,
					columns	: 3
				},
			} );
		},
		tb_grid_instagram: function(){
			$( '#instagram_feed' ).gridrotator( {
				rows			: 1,
				columns			: 6,
				animType		: 'fadeInOut',
				w1024			: {
					rows	: 1,
					columns	: 6
				},

				w768			: {
					rows	: 2,
					columns	: 3
				},

				w480			: {
					rows	: 2,
					columns	: 3
				},

				w320			: {
					rows	: 2,
					columns	: 3
				},

				w240			: {
					rows	: 2,
					columns	: 3
				},
			} );
		},
		tb_wrap_carousel: function( _element ){
			if( _element.length === 0 ) return;
			_element.parent().addClass('tb-wrap-carousel');
		},
		tb_carousel: function( items, element, marg = 10, assiged ){
			var _element = $(element+items);
			if( _element.length === 0 && assiged ){
				_element = $(element);
				AquaObj.assiged = true;
			}
			if( _element.length === 0 ) return;
			var _carousel_ops = {
				loop:true,
				margin: marg,
				navText:['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
				dots:true,
				responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					768:{
						items: ( items > 2 ) ? ( items - 2 ) : ( items > 1 ) ? ( items - 1) : items,
					},
					992:{
						items: ( items > 1 ) ? ( items - 1 ) : items,
					},
					1200:{
						items:items,
						nav:true,
					}
				}
			};

			_element.find('.owl-carousel').owlCarousel( _carousel_ops );

			//AquaObj.tb_set_pos_owlnav( _element );
			AquaObj.tb_wrap_carousel( _element );
		},	
		tb_set_pos_owlnav: function( _element ){
			if( _element.length === 0 ) return;
			_element.on('mouseenter', function(){
				if( ! AquaObj.set_pos ){
					var top = _element.find('.tb-image').first().height()/2;
					if( top ){
						_element.find('.owl-prev').css('top', top).next('.owl-next').css('top', top);
					}
					AquaObj.set_pos = true;
				}
			})

		},
	
		tb_light_box: function(){
			var _template = '<div class="tb-overlay-bg"><div class="tb-overlay-container"><div class="tb-overlay-content content-lightbox"><div class="portfolio-lightbox"><img class="img-responsive" src="IMGURL"><button title="Close (Esc)" type="button" class="tb-close"><i class="fa fa-times"></i></button></div></div></div></div>';
			$('body .tb-open-lighth-box').on('click', function(e){
				e.preventDefault();
				var img = $(this).data('src');
				if(  img.length > 0 ){
					$('body').append(_template.replace( 'IMGURL', img )).find('.tb-overlay-bg').fadeIn(200);
				}
			});
			$('body').on('click','button.tb-close', function(e){
				e.preventDefault();
				$('body').find('.tb-overlay-bg').fadeOut( function(){
					if( $(this).attr('id') == 'appointment-popup'){
						$(this).fadeOut();
					}else{
						$(this).remove();
					}
				})
			})
		},
		tb_comment:function(){
			var _comment_form = $("#commentform");
			if( _comment_form.lenght === 0 ) return;
			// change textarea position
			_comment_form.find('.form-submit').before(_comment_form.find('.comment-form-comment').detach());
		},
		tb_porfolio_masonry: function(){
			var _masonry = $('.grid-portfolio');
			if( _masonry.length === 0 ) return;
			var _masonry = _masonry.masonry({
				itemSelector: '.grid-item',
				percentPosition: true,
				gutter: 10,
				columnWidth: 2,
				
			});
		},
	
		tb_gallery_masonry: function(){
			var _masonry = $('.grid-gallery.tpl2');
			if( _masonry.length === 0 ) return;
			var _gallery_masonry = _masonry.masonry({
			    percentPosition: true,
				itemSelector: '.grid-item',
				columnWidth: 1,
			});

		},
		tb_post_ajax: function( action, data ){
			data = {
				'action': 'tb'+action,
				'data': data
			};
			return $.post( the_ajax_script.ajaxurl, data );
		},
		tb_cal_body: function(){
			var _cal_form_result = $('.cal_body_result');
			if( _cal_form_result.lenght === 0 ) return;
			var _cal_form = $('.cal_body_form');
			if( _cal_form.lenght === 0 ) return;
			var _btn_cal = _cal_form.find('.btn-calc');
			if( _btn_cal.lenght === 0 ) return;
			//_btn_cal.on('click', function(e){
				//e.preventDefault();
			
				var _form = $(_btn_cal).closest('form');
				if( _form.length === 0 ) return;
				
				var data = {},
					_this = $(this);		
				data.bust = _form.find('#bust').val();
				data.waist = _form.find('#waist').val();
				data.hips = _form.find('#hips').val();
				_cal_form_result.addClass('blog-more-ajax-loading');
				$.ajax({
					type: "POST",
					url: variable_js.ajax_url,
					data: {action: 'tb_render_cal_body', data: data},
					success: function(data){
						_cal_form_result.removeClass('blog-more-ajax-loading');
						_cal_form_result.empty().append(data);
					}
				})
			//})
		},
		tb_set_stick_bar:function( header_offset ){
			AquaObj._header_offset = ( header_offset ) ? header_offset : ( ( AquaObj._header_offset ) ? AquaObj._header_offset : ( $('.tb-header-wrap .header-menu').length > 0 ) ? $('.tb-header-wrap .header-menu').height() : 0 );
			if( AquaObj._header_offset ){
				setTimeout(function(){
					if ($(window).scrollTop() > AquaObj._header_offset/2 || ($(window).scrollTop() + $(window).height()) > ($(document).height() - 5) ) {
						$('body').addClass('tb-stick-active');
					} else {
						$('body').removeClass('tb-stick-active');
					}
				}, 500)
			}
		},
		tb_run_ready:function(){
			AquaObj.tb_carousel( 4, '.tb-classes-carousel' );
			AquaObj.tb_carousel( 3, '.tb-classes-carousel', 30 );
			AquaObj.tb_carousel( 4, '.tb-product-carousel' );
			AquaObj.tb_carousel( 3, '.tb-product-carousel', 30 );
			AquaObj.tb_carousel( 2, '.tb-product-carousel' );
			AquaObj.tb_carousel( 4, '.tb-events-carousel' );
			AquaObj.tb_carousel( 3, '.tb-events-carousel', 30 );
			AquaObj.tb_carousel( 2, '.tb-events-carousel', 30 );
			AquaObj.tb_carousel( 1, '.tb-events-carousel', true );
			AquaObj.tb_carousel( 1, '.tb-blog-carousel', 10 );
			AquaObj.tb_carousel( 1, '.jws-theme-twitter-widget');
			AquaObj.tb_featured_video();
			AquaObj.tb_gallery_grid();
			AquaObj.tb_grid_instagram();
			
			AquaObj.tb_light_box();
			//AquaObj.tb_cal_body();
			AquaObj.tb_comment();
			//AquaObj.tb_porfolio_masonry();
		},
	};
	!(function($){
		function tbripple(elem, opts){
			this.thisEl = $(elem),
			this.opts = $.extend({
				version: "1.0.0"
			}, opts);
			this.init();
		}
		tbripple.prototype = {
			init: function(){
				if(this.thisEl.is('[disable]') == true){ return; }
				var tbripple = this;
				var ripple = $('<span>').addClass('ripple').css({width: 100, height: 100});
				this.thisEl.append(ripple);
				this.thisEl.bind('click', function(e){
					var p = tbripple.thisEl.offset();
					var position = { x: p.left, y: p.top }
					var mPosition = { x: e.pageX - 50, y: e.pageY - 50 }
					ripple.removeClass('animate');
					setTimeout(function(){
						ripple.css({
							left: mPosition.x - position.x,
							top: mPosition.y - position.y,
						}).addClass('animate');
					}, 20)
				})
			}
		}
		$.fn.tbripple = function(opts){
			return $(this).each(function(){
				new tbripple(this, opts);
			})
		}
	})(jQuery)
	/* CAROUSEL PARAMOVE PLUGIN */
	!(function($){
		function paramove(elem, $otps){
			this.element = $(elem);
			this.otps = $.extend({
				version: '1.0.0',
				selector: ''
			}, $otps)
			this.animate();
		}
		paramove.prototype = {
			animate: function(){
				var paramove = this,
				thisEl = this.element,
				elemP = thisEl.offset(),
				elemC = {},
				mouse = {};
				thisEl.css({ translate: '0s' });
				this.element.on({
					mousemove: function(event){
						m = { x: (event.pageX - elemP.left), y: (event.pageY - elemP.top) };
						elemC = { w: (thisEl.width() / 2), h: (thisEl.height() / 2) };
						x = (m.x > elemC.w)? ((m.x - elemC.w) * -1) : (elemC.w - m.x);
						y = (m.y > elemC.h)? ((m.y - elemC.h) * -1) : (elemC.h - m.y);
						console.log(event.clientX - elemP.left);
						if(paramove.otps.selector){
							thisEl.find(paramove.otps.selector).css({
								transform: 'translate3d({0}px, {1}px, 0)'.format(x / 50, y / 50)
							});
							}else{
							thisEl.children().css({
								transform: 'translate3d({0}px, {1}px, 0)'.format(x / 50, y / 50)
							});
						}
					},
					mouseout: function(){
						if(paramove.otps.selector){
							thisEl.find(paramove.otps.selector).css({
								transform: 'translate3d({0}px, {1}px, 0)'.format(0, 0)
							});
							}else{
							thisEl.children().css({
								transform: 'translate3d({0}px, {1}px, 0)'.format(0, 0)
							});
						}
					}
				})
			}
		}
		$.fn.paramove = function($otps){
			return this.each(function(){
				new paramove(this, $otps);
			})
		}
		String.prototype.format = function () {
			var args = arguments;
			return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
				if (m == "{{") { return "{"; }
				if (m == "}}") { return "}"; }
				return args[n];
			});
		};
	})(jQuery)
	/* IMG BLUR PLUGIN */
	!(function($){
		function tbblur(elem, opts){
			this.thisEL = $(elem);
			this.opts = $.extend({
				version: '1.0.0'
			}, opts);
			this.init();
		}
		tbblur.prototype = {
			init: function(){
				var tbblur = this,
				canvas = document.createElement('canvas'),
				ctx = canvas.getContext("2d"),
				e = 2;
				tbblur.params_img = { w: 0, h: 0 };
				tbblur.img = tbblur.thisEL.find('img');
				$(window).resize(function(){
					tbblur.params_img.w = parseInt(tbblur.img.css('width'));
					tbblur.params_img.h = parseInt(tbblur.img.css('height'));
					canvas.width = tbblur.params_img.w;
					canvas.height = tbblur.params_img.h;
					ctx.drawImage(tbblur.img.get(0), 0, 0, tbblur.params_img.w, tbblur.params_img.h);
					ctx.globalAlpha = 0.5;
					for(var t = -e; t <= e; t += 3) {
						for(var n = -e; n <= e; n += 3) {
							ctx.drawImage(canvas, n, t, tbblur.params_img.w, tbblur.params_img.h);
							var blob = n >= 0 && t >= 0 && ctx.drawImage(canvas, -(n-1), -(t-1), tbblur.params_img.w, tbblur.params_img.h);
						}
					}
				}).trigger('resize');
				tbblur.thisEL.append(canvas);
			}
		}
		$.fn.tbblur = function(opts){
			return $(this).each(function(){
				new tbblur(this, opts);
			})
		}
	})(jQuery)
	jQuery(document).ready(function($) {
		
		AquaObj.tb_run_ready();
		
		function ROtesttimonialSlider($elem) {
			if ($elem.length) {
				$elem.flexslider({
					controlNav: true,
					directionNav: true
				});
			}
		}
		ROtesttimonialSlider($('#ro-testimonial-slider'));
		function ROtesttimonialSlider2() {
			$('#ro-testimonial-1').flexslider({
				animation: "slide",
				animationLoop: true,
				controlNav: true,
				slideshow: true,
				directionNav: false
			});
		}
		ROtesttimonialSlider2();
		function ROtesttimonialSlider3() {
			$('#ro-testimonial-2').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true
			});
		}
		ROtesttimonialSlider3();
		function ROimgSlider() {
			$('#ro-images-slider').flexslider({
				animation: "slide",
				animationLoop: false,
				itemWidth: 200,
				controlNav: false,
				directionNav: true,
				minItems: 2,
				move: 1,
				maxItems: 8
			});
		}
		ROimgSlider();
		
		function ROTestimonialSlider() {
					 
			  $('#tb-testimonial-image').flexslider({
				animation: "slide",
				controlNav: false,
				startAt: 1,
				animationLoop: false,
				controlNav: "thumbnails",
				directionNav: true,
				slideshow: false,
			  });
		}
		
		ROTestimonialSlider();
		function ROzoomImage() {
			var $window = $(window);
			$("#Ro_zoom_image > img").elevateZoom({
				zoomType: "lens",
				responsive: true,
				containLensZoom: true,
				cursor: 'pointer',
				gallery:'Ro_gallery_0',
				borderSize: 3,
				borderColour: "#84C340",
				galleryActiveClass: "ro-active",
				loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
			});
			$("#Ro_zoom_image > img").on("click", function(e) {
				var ez =   $('#Ro_zoom_image > img').data('elevateZoom');
				$.fancybox(ez.getGalleryList());
				return false;
			});
		}
		ROzoomImage();
		function ROincremental(){
			var _increment = $('.tb-incremental');
			if( _increment.length === 0 ) return;
				_increment.each( function(){
					$(this).find('.counter').counterUp({
						delay: 10,
						time: 1000
					});
			})
		}
		
		if($('.ro-service-wrap.tpl10').length > 0){
			$('.ro-service-wrap.tpl10').hover(function (e) {
				e.preventDefault();
				$('body').find('.ro-service-wrap').removeClass('active');
				$(this).addClass('active');
			});
		}
		ROincremental();
		function ROheadervideo() {
			$("#ro-play-button").on("click", function(e){
				e.preventDefault();
				$.fancybox({
					'padding' : 0,
					'autoScale': false,
					'transitionIn': 'none',
					'transitionOut': 'none',
					'title': this.title,
					'width': 720,
					'height': 405,
					'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
					'type': 'swf',
					'swf': {
						'wmode': 'transparent',
						'allowfullscreen': 'true'
					}
				});
			});
		}
		
		function ROBlogCarousel() {
			  $('#tb-blog-image').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				controlNav: "thumbnails",
				directionNav: false,
				slideshow: false,
			  });
			  
			  var _nav_thumb = $('.flex-control-nav');
			  if( _nav_thumb.length === 0)  return; 
			  _nav_thumb.find('li').append("<p class='light_opacity'></p>");
		}
		ROBlogCarousel();
		//ROheadervideo();
		function ROEasingMoving() {
			var $root = $('html, body');
			$('#nav > li > a, .ro-follow-button').on('click', function() {
				var href = $.attr(this, 'href');
				if(href.substring(0,1)=='#'){
					$root.animate({
						scrollTop: ($(href).offset().top)
						}, 500, function() {
						window.location.hash = href;
					});
					return false;
				}
			});
		}
		ROEasingMoving();
		
		var _opensearch = $('.widget_mini_icon');
		function openSearch() {
			
			$('.icon_search_wrap').on('click', function(e) {
				e.preventDefault();
				$(this).next('.widget_searchform_content').addClass('open');
				$(".search-form input[type=text]" ).focus();
			});
			$(".search-form").click(function(e){
				e.stopPropagation();
			});
			$('body').on('click','.widget_searchform_content', function(e){
				e.preventDefault();
				$('body').find('.widget_searchform_content').removeClass('open');
			})
			$('.search-form').on('click','.close', function(e){
				e.preventDefault();
				$(this).closest('.widget_searchform_content').removeClass('open');
				e.stopPropagation();
			});
			
		}
		if( _opensearch.length ){
			openSearch();
		}
		
		//Date picker
		function RODatePicker() {
			if ($('#rtb-date_custom').length) {
				$('#rtb-date_custom').datepicker();
			}
		}
		RODatePicker();
		
		/*Header stick*/
		function ROHeaderStick() {
			if( $('.header-menu').length > 0 ){
				if($( '.tb-header-wrap' ).hasClass( 'tb_stick_header' )) {
					AquaObj.tb_set_stick_bar();
					$(window).on('scroll load resize', function() {
						AquaObj.tb_set_stick_bar();
					});
				}
			}
		}
		ROHeaderStick();
		
		$(".blog-desc").each(function() {
			$(this).dotdotdot();
		});
		$(window).on('resize', function() {
			$(".blog-desc").each(function() {
				$(this).dotdotdot();
			});
		});
		// Back to top btn
		var tb_back_to_top = jQuery('#tb_back_to_top');
		var window_height = jQuery(window).height();
		jQuery(window).scroll(function () {
			/* back to top */
			var scroll_top = $(window).scrollTop();
			if (scroll_top < window_height) {
				tb_back_to_top.addClass('no-active').removeClass('active');
				} else {
				tb_back_to_top.removeClass('no-active').addClass('active');
			}
		});
		tb_back_to_top.click(function () {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1500);
		});
		// switch currency
		$(document).on("click",".dd-select",function(){
			console.log('ok');
			$('.dd-pointer').each(function(){
				if($(this).hasClass('dd-pointer-up')){
					$(this).closest('.dd-select').addClass('active');
					}else{					
					$(this).closest('.dd-select').removeClass('active');
				}
			})
		})
		// Hook cart success
		jQuery('.add_to_cart_button').click(function(e){
			var $_this = jQuery(this);
			var $_cart = jQuery('.widget_mini_cart_wrap');
			$_cart.removeClass('animate_cart');
			var cart = jQuery('.tb_right_fx_wrap .widget_shopping_cart');
			jQuery(document).ajaxSuccess(function(e, xhr, settings) {
				//console.log(settings.data);
				if(!$('.widget_mini_cart_wrap').is(":visible")){
					$('.widget_mini_cart_wrap').show();
				}
				if(typeof(settings.data)!='undefined'){
					if(settings.data.indexOf('woocommerce_add_to_cart') > -1){
						console.log('yay!');
						$_cart.addClass('animate_cart');				
					}
				}
				$('.widget_mini_cart_wrap').removeClass('tb-cart-empty');
			});
		})
		/* Btn menu click */
		jQuery('#ro-hamburger').click(function(){
			jQuery('body').toggleClass('ro-main-nav-opened');
			$('.ro-main-nav-opened .menu-list.active ul li.menu-item-has-children >a').on('click',function(e) {
				e.preventDefault();
				//console.log("preventDefault");
			});
		})		
		jQuery('.tb_right_fx_wrap .wg-title').click(function(e){
			e.stopPropagation();
			jQuery(this).toggleClass( "active" );
			jQuery('.tb_right_fx_wrap .widget_shopping_cart_content').toggleClass( "active" );
		})	
		$('body').click(function (e) {
			var target = $(e.target);
			if (target.parents('.tb_right_fx_wrap').length == 0 && !target.hasClass('tb_right_fx_wrap')) {
				$('.tb_right_fx_wrap .wg-title,.tb_right_fx_wrap .widget_shopping_cart_content').removeClass('active');
			}
		});
		// Same Height
		jQuery('.row').each(function() {
			if (jQuery(this).hasClass('same-height')) {
				var height = jQuery(this).children().height();
				jQuery(this).children().each(function() {
					jQuery(this).css('min-height', height);
				});
			}
		});
		// Same Height
		
		// Color box
		jQuery(".view-image").colorbox({rel:'colorbox', maxWidth:'90%', maxHeight:'90%' });
		// Mixitup
		if ($.fn.mixItUp) { $('#Container').mixItUp(); }
		// Ripple
		jQuery('.tbripple').tbripple();
		if (jQuery('.tb-blog-image .blog-note-top').length > 0){
			jQuery('.tb-blog-image .blog-note-top').on('click', function(e){
				e.preventDefault();
				$(this).parent().fadeOut('slow', function(){
					$(this).remove();
				});
			})
		}
		$('body').on('click focus', '#rtb-date, #rtb-time', function(e){  
			var $this = $(this),
			top = $(window).scrollTop();
			setTimeout(function(){
				$(window).scrollTop(top);
			}, 10)
			$('.picker__holder').unbind('click').bind('click', function(){
				setTimeout(function(){
					$(window).scrollTop(top);
				}, 10)
			})
		})
		//countdown
		var $tb_countdown_js = $('.tb-countdown-js');
		if($tb_countdown_js.length > 0){
			$tb_countdown_js.each(function(){
				var $this = $(this),
				dateEnd = $this.data('countdown');
				$this.countdown(dateEnd, function(event){
					var $this = $(this).html(event.strftime(''
					+ '<span class="tb-box-countdown"><span>%m</span> <p>Months</p></span> '
					+ '<span class="tb-box-countdown"><span>%d</span> <p>Days</p></span> '
					+ '<span class="tb-box-countdown"><span>%H</span> <p>Hours</p></span> '
					+ '<span class="tb-box-countdown"><span>%M</span> <p>Minutes</p></span> '
					+ '<span class="tb-box-countdown"><span>%S</span> <p>Seconds</p></span>'));
				});
			})
		}
		//checkout
		$('.ro-checkout-process .ro-hr-line .ro-tab-1, .ro-customer-info .ro-edit-customer-info').click(function(){
			var process1 = $('.ro-checkout-process .ro-hr-line .ro-tab-1');
			process1.parent().parent().removeClass('ro-process-2');
			process1.parent().parent().addClass('ro-process-1');
			$('.ro-checkout-panel .ro-panel-1').css('display', 'block');
			$('.ro-checkout-panel .ro-panel-2').css('display', 'none');
		});
		$('.ro-checkout-process .ro-hr-line .ro-tab-2, .ro-checkout-panel .ro-btn-2').click(function(){
			var process2 = $('.ro-checkout-process .ro-hr-line .ro-tab-2');
			process2.parent().parent().removeClass('ro-process-1');
			process2.parent().parent().addClass('ro-process-2');
			$('.ro-checkout-panel .ro-panel-1').css('display', 'none');
			$('.ro-checkout-panel .ro-panel-2').css('display', 'block');
		});
	});
	jQuery(window).load(function(){
		// Paramove carousel
		
		AquaObj.tb_cal_body();
		AquaObj.tb_porfolio_masonry();
		AquaObj.tb_gallery_masonry();
		setTimeout(function(){
			jQuery('.js-paramove').each(function(){
				jQuery(this).paramove({ selector: jQuery(this).data('paramove-target') });
			})
		}, 1000)
		// Image blur
		if( jQuery('.tbblur').length > 0 )
		jQuery('.tbblur').tbblur();
		// func active tabs default
		jQuery('.wpb_tabs').each(function(){
			var wpb_tabs_nav = $(this).find('.wpb_tabs_nav'),
			active_num = wpb_tabs_nav.data('active-tab');
			wpb_tabs_nav.find('li').eq(parseInt(active_num) - 1).trigger('click');
		})
		var $nice_scroll_class_js = $('.nice-scroll-class-js');
		if($nice_scroll_class_js.length > 0 && $.fn.niceScroll !== undefined){
			$nice_scroll_class_js.each(function(){
				$(this).niceScroll();
			})
		}
        // caculate height product
        var maxHeight = 0;        
        jQuery(".tb-products-list .tb-product-items .tb-product-item").each(function(){
			if (jQuery(this).height() > maxHeight) { maxHeight = jQuery(this).height(); }
		});        
        jQuery(".tb-products-list .tb-product-items .tb-product-item").height(maxHeight);
	})
})(jQuery);