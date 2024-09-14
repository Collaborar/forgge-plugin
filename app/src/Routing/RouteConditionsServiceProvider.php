<?php

namespace MyApp\Routing;

use Forgge\ServiceProviders\ServiceProviderInterface;

/**
 * Provide custom route conditions.
 * This is an example class so feel free to modify or remove it.
 */
class RouteConditionsServiceProvider implements ServiceProviderInterface {
	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
		// Example route condition registration.
		// $this->registerRouteCondition( $container, 'my_condition', MyCondition::class );
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		// Nothing to bootstrap.
	}

	/**
	 * Register a class as a route condition
	 *
	 * @param  \Pimple\Container $container
	 * @param  string            $name
	 * @param  string            $class_name
	 * @return void
	 */
	protected function registerRouteCondition( $container, $name, $class_name ) {
		$container[ FORGGE_ROUTING_CONDITION_TYPES_KEY ] = array_merge(
			$container[ FORGGE_ROUTING_CONDITION_TYPES_KEY ],
			[
				$name => $class_name,
			]
		);
	}
}
