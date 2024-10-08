<?php
/**
 * Handle Forgge version checking to make sure a compatible version is loaded.
 *
 * @package MyApp
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'my_app_get_loaded_forgge' ) ) {
	/**
	 * Get the currently loaded Forgge version, if any.
	 *
	 * @return array|false
	 */
	function my_app_get_loaded_forgge() {
		/**
		 * Filters the loaded Forgge version.
		 *
		 * @param array|false $loaded
		 */
		return apply_filters( 'forgge_loaded', false );
	}
}

if ( ! function_exists( 'my_app_should_load_forgge' ) ) {
	/**
	 * Get whether a compatible Forgge version is or should be loaded.
	 *
	 * @param string $name Project name.
	 * @param string $min Minimum version (inclusive).
	 * @param string $max Maximum version (exclusive).
	 * @return bool
	 */
	function my_app_should_load_forgge( $name, $min, $max ) {
		$loaded = my_app_get_loaded_forgge();

		if ( false === $loaded ) {
			// No version is loaded, yet.
			return true;
		}

		if ( version_compare( $loaded['version'], $min, '>=' ) && version_compare( $loaded['version'], $max, '<' ) ) {
			// A compatible version is already loaded.
			return true;
		}

		add_action(
			'admin_notices',
			function () use ( $name, $min, $max, $loaded ) {
				// Translators: %1$s = plugin or theme name; %2$s = minimum version number; %3$s = maximum version number; %4$s plugin or theme name; %5$s loaded version number.
				$message = __( '%1$s requires Forgge version >= %2$s and < %3$s but %4$s has already loaded version %5$s.', 'my_app' );
				?>
				<div class="notice notice-error">
					<p><strong><?php echo esc_html( $name ); ?></strong></p>
					<p><?php echo esc_html( sprintf( $message, $name, $min, $max, $loaded['name'], $loaded['version'] ) ); ?></p>
				</div>
				<?php
			}
		);

		// An incompatible version is already loaded.
		return false;
	}
}

if ( ! function_exists( 'my_app_declare_loaded_forgge' ) ) {
	/**
	 * Declare the loaded Forgge version.
	 *
	 * @param  string $name Project name.
	 * @param  string $type Project type - 'plugin' or 'theme'.
	 * @param  string $file Main project file.
	 * @return void
	 */
	function my_app_declare_loaded_forgge( $name, $type, $file ) {
		$loaded = my_app_get_loaded_forgge();

		if ( $loaded ) {
			// A version is already loaded - bail.
			return;
		}

		// Declare loaded Forgge version.
		add_filter(
			'forgge_loaded',
			function () use ( $name, $type, $file ) {
				return [
					'version' => FORGGE_VERSION,
					'name'    => $name,
					'type'    => $type,
					'file'    => $file,
				];
			}
		);
	}
}
