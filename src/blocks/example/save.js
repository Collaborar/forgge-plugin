/**
 * External dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'My App - hello from the editor!' }
		</p>
	);
}
