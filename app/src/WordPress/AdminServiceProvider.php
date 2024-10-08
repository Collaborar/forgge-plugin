<?php

namespace MyApp\WordPress;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register admin-related entities, like admin menu pages.
 */
class AdminServiceProvider implements ServiceProviderInterface {
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
		add_action( 'admin_menu', [$this, 'registerAdminPages'] );
	}

	/**
	 * Register admin pages.
	 *
	 * @return void
	 */
	public function registerAdminPages() {
		// phpcs:ignore
		// add_theme_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', int $position = null );
	}
}
