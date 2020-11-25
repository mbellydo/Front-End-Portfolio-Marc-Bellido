/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// navbar.
		var $navbar = $('#navbar');

		$navbar.wrapInner('<div class="inner"></div>');

		$navbar._locked = false;

		$navbar._lock = function() {

			if ($navbar._locked)
				return false;

			$navbar._locked = true;

			window.setTimeout(function() {
				$navbar._locked = false;
			}, 350);

			return true;

		};

		$navbar._show = function() {

			if ($navbar._lock())
				$body.addClass('is-navbar-visible');

		};

		$navbar._hide = function() {

			if ($navbar._lock())
				$body.removeClass('is-navbar-visible');

		};

		$navbar._toggle = function() {

			if ($navbar._lock())
				$body.toggleClass('is-navbar-visible');

		};

		$navbar
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$navbar._hide();

				// Redirect.
					if (href == '#navbar')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#navbar">Close</a>');

		$body
			.on('click', 'a[href="#navbar"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$navbar._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$navbar._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$navbar._hide();

			});

})(jQuery);