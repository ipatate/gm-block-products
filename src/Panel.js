import {
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/blockEditor";
import { __ } from "@wordpress/i18n";

const Panel = ({ props }) => {
	const { attributes, setAttributes, products_categories } = props;
	const { total, categories, blocTitle } = attributes;
	const options = products_categories
		? products_categories.map((e) => ({ label: e.name, value: e.id }))
		: [];
	return (
		<InspectorControls>
			<PanelBody title={__("Settings", "gm-block-products")}>
				<TextControl
					label={__("Title", "gm-block-products")}
					value={blocTitle}
					onChange={(content) => setAttributes({ blocTitle: content })}
				/>
				<SelectControl
					label={__("Category", "gm-block-products")}
					value={categories}
					multiple
					options={options}
					onChange={(content) => setAttributes({ categories: content })}
				/>
				<RangeControl
					label={__("Limit products", "gm-block-products")}
					value={total || 6}
					min={1}
					max={100}
					onChange={(content) => setAttributes({ total: content })}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Panel;
