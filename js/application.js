/*!
 * Switcheroo by OriginalEXE
 * https://github.com/OriginalEXE/Switcheroo
 * MIT licenced
 */

// Global "use strict", wrap it up in functions if you can't deal with it...
"use strict";

/* --- DETECT PLATFORM --- */

function platformDetect(){
		var phone, touch, ltie9, lteie9, wh, ww, dh, ar, fonts;
    $.support.touch = 'ontouchend' in document;
    var navUA = navigator.userAgent.toLowerCase(),
    navPlat = navigator.platform.toLowerCase();
    
    var isiPhone = navPlat.indexOf("iphone"),
    isiPod = navPlat.indexOf("ipod"),
    isAndroidPhone = navPlat.indexOf("android"),
    safari = (navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1) ? true : false,
    svgSupport = (window.SVGAngle) ? true : false,
    svgSupportAlt = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false,
    ff3x = (/gecko/i.test(navUA) && /rv:1.9/i.test(navUA)) ? true : false;
    
    phone = (isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1) ? true : false;
    touch = $.support.touch ? true : false;
    ltie9 = $.support.leadingWhitespace ? false : true;
    lteie9 = typeof window.atob === 'undefined' ? true : false;

    var $bod = $('body');
    
    if (touch) {$bod.addClass('touch');}
    if (safari) $bod.addClass('safari');
    if (phone) $bod.addClass('phone'); 

    //Close the bar on mobile devices
    if($bod.hasClass('touch') || $bod.hasClass('phone')) {
    			top.location.replace( $products[ $current_product ].url );
    }
};

// Insert products to carousel
$.each( $products, function( key, object ) {

	if ( 'tooltip' in object ) { 

		var tooltip = 'title="' + object.tooltip.replace( /"/g, '\'' ) + '"';

	} else {

		var tooltip = '';

	}

	$( '.products-list' ).append(
		'<a class="product pull-left" data-product="'+object.name+'" data-id="' + key + '" ' + tooltip + '><img src="' + object.img + '" alt="' + object.name + '" width="236" height="120"><span class="title">' + object.name + '</span><span class="badge">' + object.tag + '</span></a>'
	);

});

// Purchase bar on click
$( '.purchase-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.replace( $products[ $current_product ][ 'purchase' ] );

	}

	return false;

});

// Bail out if mobile, it does not behave good, damn idevices...
if ( jQuery.browser.mobile || $('body').hasClass('touch') ) {

	if ( $current_product in $products ) {

		top.location.replace( $products[ $current_product ].url );

	}

}

// Close btn on click
$( '.remove-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.replace( $products[ $current_product ].url );

	}

	return false;

});

// Let's calculate iframe height
function switcher_iframe_height() {

	if ( $( 'body' ).hasClass( 'toggle' ) ) return;

	var $w_height = $( window ).height(),
		$b_height = $( '.switcher-bar' ).height() + $( '.switcher-body' ).height(),
		$i_height = $w_height - $b_height - 2;

	$( '.product-iframe' ).height( $i_height );

}

$( document ).ready( function() {

	switcher_iframe_height();

});

$( window ).resize( function() {

	switcher_iframe_height();

});

$( window ).load( function() {

	switcher_iframe_height();

});

// Switching views
$( '.desktop-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : $( window ).width()
	});

	return false;

});

$( '.tablet-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : '768px'
	});

	return false;

});

$( '.mobile-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : '480px'
	});

	return false;

});

// Products carousel. Yeah, I use carousel, sue me.
$( '.products-list' ).carouFredSel({
	auto       : false,
	circular   : false,
	infinite   : false,
	cookie     : 'position',
	mousewheel : true,
	scroll     : {
		items : 1
	},
	width      : '100%',
	prev       : '.products-prev',
	next       : '.products-next'
});

// On click, toggle product switcher
$( '.product-switcher a' ).on( 'click', function() {

	$( 'body' ).toggleClass( 'toggle' );
	
	if ( ! $( 'body' ).hasClass( 'toggle' ) ) {

		setTimeout( 'switcher_iframe_height()', 210 );
		setTimeout( 'switcher_iframe_height()', 310 );
		setTimeout( 'switcher_iframe_height()', 410 );
		setTimeout( 'switcher_iframe_height()', 1500 );
		setTimeout( 'switcher_iframe_height()', 2500 );

	}

	return false;

});

// Start the application
$( document ).ready( function() {
	
	$current_product = location.hash.replace('#', '');


	if ( ! ( $current_product in $products ) || $current_product === '' ) {

		$current_product = location.search.replace('?product=', '');

		if ( ! ( $current_product in $products ) || $current_product === '' ) {

			for (var key in $products ) if ( $products.hasOwnProperty( key ) ) break;

			$current_product = key;

		}

	}

	$('.product-switcher a').html( 
		$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span><i class="icon-angle-down"></i>'
	).attr("data-product", $products[ $current_product ].name);

	$( '.product-options ul' ).html($products[ $current_product ].options);

	$( '.product-iframe' ).attr( 'src', $products[ $current_product ].url );

	$( '.product' ).tooltip({
		container : 'body',
		html      : true,
		placement : 'auto bottom',
		trigger   : 'hover'
	});

	 platformDetect();

});

$( '.product' ).click( function() {

	$current_product = $( this ).data( 'id' );

	if ( $current_product in $products ) {

		$( 'body' ).toggleClass( 'toggle' );

		$( '.product-switcher a' ).html( 
			$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span><i class="icon-angle-down"></i>'
		).attr("data-product", $products[ $current_product ].name);

		$( '.product-iframe' ).attr( 'src', $products[ $current_product ].url );

		location.hash = '#' + $current_product;

		$( '.product-options ul' ).html($products[ $current_product ].options);

	}

	return false;

});

// Lens options
$( document ).ready( function() {

	//Switcher
	$( '.lens_rtl a' ).click( function(e) {
		e.preventDefault();

		$( '.lens_rtl a' ).toggleClass('active');

		$('.product-iframe').attr( 'src', $(this).attr('href') );
		
	});

	//Header Inverse
	$("input#sidebar-inverse").change(function(e) {
	        if ($(this).is(':checked')) {
	            $('.product-iframe').contents().find('body').addClass('header-inverse');
	        } else {
	        	$('.product-iframe').contents().find('body').removeClass('header-inverse');
	        }   
	})

})