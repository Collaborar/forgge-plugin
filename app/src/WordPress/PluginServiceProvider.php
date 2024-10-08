<?php

namespace MyApp\WordPress;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register plugin options.
 */
class PluginServiceProvider implements ServiceProviderInterface {
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
		register_activation_hook( MY_APP_PLUGIN_FILE, [$this, 'activate'] );
		register_deactivation_hook( MY_APP_PLUGIN_FILE, [$this, 'deactivate'] );

		add_action( 'plugins_loaded', [$this, 'loadTextdomain'] );
	}

	/**
	 * Plugin activation.
	 *
	 * @return void
	 */
	public function activate() {
		// Nothing to do right now.
	}

	/**
	 * Plugin deactivation.
	 *
	 * @return void
	 */
	public function deactivate() {
		// Nothing to do right now.
	}

	/**
	 * Load textdomain.
	 *
	 * @return void
	 */
	public function loadTextdomain() {
		load_plugin_textdomain( 'my_app', false, basename( dirname( MY_APP_PLUGIN_FILE ) ) . DIRECTORY_SEPARATOR . 'languages' );
	}
}
