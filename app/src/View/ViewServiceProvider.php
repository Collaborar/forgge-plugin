<?php

namespace MyApp\View;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register view composers and globals.
 * This is an example class so feel free to modify or remove it.
 */
class ViewServiceProvider implements ServiceProviderInterface {
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
		$this->registerGlobals();
		$this->registerComposers();
	}

	/**
	 * Register view globals.
	 *
	 * @return void
	 */
	protected function registerGlobals() {
		/**
		 * Globals
		 */
		// phpcs:ignore
		// \MyApp::views()->addGlobal( 'foo', 'bar' );
	}

	/**
	 * Register view composers.
	 *
	 * @return void
	 */
	protected function registerComposers() {
		/**
		 * View composers
		 */
		// phpcs:ignore
		// \MyApp::views()->addComposer( 'partials/foo', 'FooPartialViewComposer' );
	}
}
