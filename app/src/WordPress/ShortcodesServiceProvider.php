<?php

namespace MyApp\WordPress;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register shortcodes.
 */
class ShortcodesServiceProvider implements ServiceProviderInterface {
	/**
	 * {@inheritDoc}
	 */
	public function register( Container $container ): void {
		// Nothing to register.
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( Container $container ): void {
		// phpcs:ignore
		// add_shortcode( 'example', [$this, 'shortcodeExample'] );
	}

	/**
	 * Example shortcode.
	 *
	 * @param  array  $atts
	 * @param  string $content
	 * @return string
	 */
	public function shortcodeExample( $atts, $content ) {
		$atts = shortcode_atts(
			array(
				'example_attribute' => 'example_value',
			),
			$atts,
			'example'
		);

		ob_start();
		?>
		<div class="shortcode-example">
			<!-- Your shortcode content goes here ... -->
		</div>
		<?php
		$html = ob_get_clean();

		// Alternatively, you can use a Forgge View instead of a buffer:
		// $html = \MyApp::view( 'some-view' )->with( $atts )->with( 'content', $content )->toString();

		return $html;
	}
}
