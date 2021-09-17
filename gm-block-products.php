<?php

namespace GMBlockProducts;

/**
 * Plugin Name:       Gm Block Products
 * Description:       This plugin allows you to display products in a block.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Faramaz Patrick <infos@goodmotion.fr>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gm-block-products
 *
 * @package           goodmotion
 */



function block_init()
{
	register_block_type_from_metadata(__DIR__, [
		"render_callback" => __NAMESPACE__ . '\render_callback',
		'attributes' => [
			'total' => [
				'type'    => 'number',
				'default' => '5',
			],
			'categories' => [
				'type' => "array",
				'items' => [
					'type' => 'number',
				],
				'default' => []
			],
			'blocTitle' => [
				'type' => "string",
				'default' => "Les produits"
			]
		]
	]);
}
add_action('init', __NAMESPACE__ . '\block_init');


function render_callback($attributes, $content)
{

	$query = array(
		// limit element
		'posts_per_page'    => $attributes['total'] ?? 0,
		// post type
		'post_type'            => 'products',
	);

	// if category selected
	if (array_key_exists('categories', $attributes) && count($attributes['categories']) > 0) {
		$query['tax_query'] = array(
			array(
				'taxonomy' => 'products_categories',
				'field' => 'id',
				'terms' => $attributes['categories'],
				'operator' => 'IN'
			)
		);
	}
	// query
	$recent_posts = new \Timber\PostQuery($query);
	$context          = \Timber::context();
	$context['title_list_products'] = $attributes['blocTitle'] ?? '';
	$context['posts'] = $recent_posts;

	// render template
	return \Timber::compile('blocks/products.twig', $context);
}
