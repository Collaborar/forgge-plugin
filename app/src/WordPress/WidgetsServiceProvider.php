<?php

namespace MyApp\WordPress;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register widgets.
 */
class WidgetsServiceProvider implements ServiceProviderInterface {
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
		add_action( 'widgets_init', [$this, 'registerWidgets'] );
	}

	/**
	 * Register widgets.
	 *
	 * @return void
	 */
	public function registerWidgets() {
		// phpcs:ignore
		// register_widget( MyWidgetClass::class );
	}
}
