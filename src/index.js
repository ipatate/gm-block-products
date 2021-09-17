import { registerBlockType } from "@wordpress/blocks";
import { withSelect } from "@wordpress/data";
import ServerSideRender from "@wordpress/server-side-render";
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import Panel from "./Panel";

registerBlockType("goodmotion/block-products", {
	title: __("GM Block Products", "gm-block-products"),
	description: __("Block for display products.", "gm-block-products"),
	icon: "buddicons-community",
	category: "goodmotion-blocks",
	example: {},
	attributes: {
		categories: {
			type: "array",
			default: [],
		},
		blocTitle: {
			type: "string",
			default: "Les produits",
		},
		total: {
			type: "number",
			default: 4,
		},
	},
	edit: withSelect((select) => {
		return {
			// products categories list
			products_categories: select("core").getEntityRecords(
				"taxonomy",
				"products_categories",
				{ per_page: 100 }
			),
		};
	})((props) => {
		const blockProps = useBlockProps();
		return (
			<div {...blockProps}>
				<Panel props={props} />
				<ServerSideRender
					block="goodmotion/block-products"
					attributes={props.attributes}
				/>
			</div>
		);
	}),
	// save
});
