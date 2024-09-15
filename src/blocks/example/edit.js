/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import './editor.scss';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __( 'My App - hello from the editor!', 'my_app' ) }
		</p>
	);
}
