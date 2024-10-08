<?php

namespace MyApp\WordPress;

use Pimple\Container;
use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Register and enqueues assets.
 */
class AssetsServiceProvider implements ServiceProviderInterface {
	/**
	 * Filesystem.
	 *
	 * @var \WP_Filesystem_Base
	 */
	protected $filesystem = null;

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
		$this->filesystem = $container[ FORGGE_APPLICATION_FILESYSTEM_KEY ];

		add_action( 'wp_enqueue_scripts', [$this, 'enqueueFrontendAssets'] );
		add_action( 'admin_enqueue_scripts', [$this, 'enqueueAdminAssets'] );
		add_action( 'wp_footer', [$this, 'loadSvgSprite'] );
	}

	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function enqueueFrontendAssets() {
		// Enqueue the built-in comment-reply script for singular pages.
		if ( is_singular() ) {
			wp_enqueue_script( 'comment-reply' );
		}

		$assets = require_once \MyApp::core()->assets()->getAssetDir( 'admin.asset.php' );

		// Enqueue scripts.
		\MyApp::core()->assets()->enqueueScript(
			'theme-js-bundle',
			\MyApp::core()->assets()->getBundleUrl( 'frontend', '.js' ),
			$assets[ 'dependencies' ],
			true
		);

		// Enqueue styles.
		$style = \MyApp::core()->assets()->getBundleUrl( 'frontend', '.css' );

		if ( $style ) {
			\MyApp::core()->assets()->enqueueStyle(
				'theme-css-bundle',
				$style
			);
		}
	}

	/**
	 * Enqueue admin assets.
	 *
	 * @return void
	 */
	public function enqueueAdminAssets() {
		$assets = require_once \MyApp::core()->assets()->getAssetDir( 'admin.asset.php' );

		// Enqueue scripts.
		\MyApp::core()->assets()->enqueueScript(
			'theme-admin-js-bundle',
			\MyApp::core()->assets()->getBundleUrl( 'admin', '.js' ),
			$assets[ 'dependencies' ],
			true
		);

		// Enqueue styles.
		$style = \MyApp::core()->assets()->getBundleUrl( 'admin', '.css' );

		if ( $style ) {
			\MyApp::core()->assets()->enqueueStyle(
				'theme-admin-css-bundle',
				$style
			);
		}
	}

	/**
	 * Load SVG sprite.
	 *
	 * @return void
	 */
	public function loadSvgSprite() {
		$file_path = implode(
			DIRECTORY_SEPARATOR,
			array_filter(
				[
					get_template_directory(),
					'dist',
					'images',
					'sprite.svg',
				]
			)
		);

		if ( ! $this->filesystem->exists( $file_path ) ) {
			return;
		}

		echo $this->filesystem->get_contents( $file_path );
	}
}
