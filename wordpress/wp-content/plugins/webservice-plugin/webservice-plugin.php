<?php
include('wordpress-webservice.php');
/*
Plugin Name: Webservice plugin
Plugin URI: http://wordpress.org/extend/plugins/
Description: This Plug in use to create Webservice from wordpress .
Version: 0.1
Author: Vishal
Author URI: http://wordpress.org/extend/plugins/
License: GPL2
*/
?>

<?php
///////// method to fetch category image url /////////////////////////
function taxonomy_image_url($term_id = NULL, $return_placeholder = FALSE) {
	if (!$term_id) {
		if (is_category())
			$term_id = get_query_var('cat');
		elseif (is_tax()) {
			$current_term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy'));
			$term_id = $current_term->term_id;
		}
	}
	$taxonomy_image_url = get_option('z_taxonomy_image'.$term_id);
	if ($return_placeholder)
		return ($taxonomy_image_url != "") ? $taxonomy_image_url : IMAGE_NOT_AVAILABLE;
	else
		return $taxonomy_image_url;
}
function taxonomy_image_url1($term_id = NULL, $return_placeholder = FALSE) {
	if (!$term_id) {
		if (is_category())
			$term_id = get_query_var('cat');
		elseif (is_tax()) {
			$current_term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy'));
			$term_id = $current_term->term_id;
		}
	}
	$taxonomy_image_url1 = get_option('z_taxonomy_image1'.$term_id);
	if ($return_placeholder)
		return ($taxonomy_image_url1 != "") ? $taxonomy_image_url1 : IMAGE_NOT_AVAILABLE;
	else
		return $taxonomy_image_url1;
}
///////////////////////////////////////////////////////

function getPost($args)
{
	
	$posts_array = get_posts( $args );
	return $posts_array;
}

///////////////////////// Ftech Category////////////////////////////////////
function fetch_category()
{
	$args = array(
	'type'                     => 'post',
	'child_of'                 => 0,
	'parent'                   => '',
	'orderby'                  => 'name',
	'order'                    => 'ASC',
	'hide_empty'               => 1,
	'hierarchical'             => 1,
	'exclude'                  => '',
	'include'                  => '',
	'number'                   => '',
	'taxonomy'                 => 'category',
	'pad_counts'               => false 
	);
	 $categories = get_categories( $args ); 
	//echo "<pre>";print_r($categories);echo "<pre>";
	if($categories){
	$data = array();
	foreach($categories as $cat)
	{
		$arr = taxonomy_image_url( $cat->term_id, TRUE );
		
		$arr1 = taxonomy_image_url1( $cat->term_id, TRUE );
		
	
		$data[] = array(
			'response' => 'SUCCESS',
			'title' => $cat->taxonomy,
			'category_id' => $cat->cat_ID,
			'category_name' => $cat->cat_name,
			'first_image' => $arr,
			'second_image' => $arr1
		);
	}
	}else{
		$data = array(
					'response' => 'NO CATEGORY AVAILABLE',
		);
		}
	
	echo json_encode($data);exit;
}
/////////////////////////////////END///////////////////////////////////////////
////////////////////////////Fetch Category by category id////////////////////////

function fetch_catid($id)
{	global $post;
	if($id){
		
	$args = array(
    'posts_per_page'  => '',
    'numberposts'     => '-1',
    'offset'          => 0,
    'category'        => $id,
    'meta_key'        => 'post_sorter_order',
    'orderby'         => 'meta_value_num',
    'order'     	  => 'ASC',
    'post_type'       => 'post',
    'post_status'     => 'publish',
    'suppress_filters'=> true );

    $posts = get_posts($args);
    $acss = new Acs();
	//$ret = $acss->get_post_ids('second_group');
	//$ret = $acss->get_all_group();
	//$ret = $acss->get_group_name(168);
	//var_dump($ret);die;
  // echo "<pre>";var_dump($posts);echo "<pre>";die;
    $data1 = array();$data11 = array();
    foreach($posts as $postss)
	{	
		$land_scape_content = get_post_meta($postss->ID,'landscape_body');
		if($land_scape_content == null){
			$land_scape_content = '';
			}
			$data1[] = array(
			'post_id' => $postss->ID,
			'post_group_name' => $acss->get_group_name($postss->ID),
			'post_title' => $postss->post_title,
			'post_content' => $postss->post_content,
			'landscape_content' => $land_scape_content[0],
			);
	
	}
	$groups = $acss->get_all_group();
	//echo "<pre>";print_r($groups);echo "<pre>";\
	$group_name = array();
    foreach($groups as $group)
	{	
			$group_name['groups'][] = array(
			'all_group_name' => $group->post_title,
			'post_ids' => $acss->get_post_ids($group->post_title)
			);
	
	}
	//print_r($group_name[0]['post_ids'][0]);
	$data11['my'] = $data1;
	$category = get_category( $id );
	if($category){
	//echo "<pre>";print_r($category);echo "<pre>";
			$arr = taxonomy_image_url( $category->term_id, TRUE );
			$arr1 = taxonomy_image_url1( $category->term_id, TRUE );
		
			$data2 = array();
			$data2 = array(
					'response' => 'SUCCESS',
					'category_id' => $category->cat_ID,
					'cat_name' => $category->name,
					'title' => $category->taxonomy,
					'first_image' => $arr,
					'second_image' => $arr1
				);
		$data = array_merge($data2,$group_name);		
		$data = array_merge($data,$data11);
		
		}
	else{
		$data = array(
				'response' => 'CATEGORY_ID_NOT_VALID'
		);
		}
	}
	else{
		$data = array(
				'response' => 'POST_DATA_EMPTY'
		);
		}
	echo json_encode($data);exit;
}
/////////////////////////////////END//////////////////////////////////
?>
