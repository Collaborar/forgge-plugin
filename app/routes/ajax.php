<?php
/**
 * WordPress AJAX Routes.
 * WARNING: Do not use \MyApp::route()->all() here, otherwise you will override
 * ALL AJAX requests which you most likely do not want to do.
 *
 * @package MyApp
 */

defined( 'ABSPATH' ) || exit;

// Using our ExampleController to handle a custom ajax action, for example.
// phpcs:ignore
// \MyApp::route()->get()->where( 'ajax', 'my-custom-ajax-action' )->handle( 'ExampleController@ajax' );
