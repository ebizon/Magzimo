<?php
/* 
 * This file defines the set of functions used by the wp-category-manager plugin to perform its actual operations
 */

/*
 * This function removes the category identified by $categoryId from the post identified by $postId
 */

include_once('wpcm-options.php');

if( ! class_exists('wpcm_functions')) :

class wpcm_functions
{
	public static function remove_term($postId, $termId)
	{
		echo $postId;

		if(is_int(intval($postId)))
		{
			global $wpdb;

			$wpdb->show_errors();

			$queryStr = $wpdb->prepare("DELETE FROM $wpdb->term_relationships where object_id = %d and term_taxonomy_id= %d", $postId, $termId);
			$wpdb->query($queryStr);
		}
	}

	/*
	 * This function returns a list of posts that belong to a category identified by $category.
	 * The optional Page parameter defines how many pages of posts to return
	 */
	public static function get_posts($termID, $page)
	{
		global $wpdb;
		$wpdb->show_errors();

		if(is_int(intval($page)))
		{
			// First figure out how many posts to show per page. This will be your limit
			$pageSize = wpcm_options::get_option('postsperpage');

			$finalQueryLine = '';

			if($pageSize != -1)
			{
				// Next figure out how many posts to skip. This will be your offset
				$offset = $pageSize * $page;

				$finalQueryLine = "limit " . $pageSize . " offset " . $offset;

			}

			$querystr = $wpdb->prepare("select wposts.*, wp_term_taxonomy.term_taxonomy_id
										 from $wpdb->posts wposts
										  LEFT JOIN $wpdb->term_relationships wp_term_relationships ON wposts.ID = wp_term_relationships.object_id
										  LEFT JOIN $wpdb->term_taxonomy wp_term_taxonomy ON wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
										  LEFT JOIN $wpdb->terms wp_terms ON wp_terms.term_id = wp_term_taxonomy.term_id
												WHERE  wp_term_taxonomy.taxonomy = '%s'
														and	wp_terms.term_id = %d
														and wposts.post_status='publish'
											ORDER BY wposts.ID " . $finalQueryLine , wpcm_options::get_option('selectedTaxonomy') , $termID);

			 $postlist = $wpdb->get_results($querystr);
			 return $postlist;
		}
	}

	public static function get_postCount($termID)
	{
		global $wpdb;
		$wpdb->show_errors();
		
		$querystr = $wpdb->prepare("select count(*)
								 from $wpdb->posts wposts
								  LEFT JOIN $wpdb->term_relationships wp_term_relationships ON wposts.ID = wp_term_relationships.object_id
								  LEFT JOIN $wpdb->term_taxonomy wp_term_taxonomy ON wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
								  LEFT JOIN $wpdb->terms wp_terms ON wp_terms.term_id = wp_term_taxonomy.term_id
										WHERE wp_term_taxonomy.taxonomy = '%s'
												and wp_terms.term_id = %d
												and wposts.post_status='publish'" , wpcm_options::get_option('selectedTaxonomy') , $termID);

		$result = $wpdb->get_var($querystr, 0, 0);
		return $result;

	}

	public static function render_posts($postlist)
	{
		if($postlist)
		{
			 foreach($postlist as $post)
			 {
				echo '<div class="catmanpost postitem" id="catmanagerpost'. $post->ID .'">';
				echo '<span class="catmantitle" ><a href="'. get_permalink($post->ID) .'" title="'.$post->post_title . '">' . $post->post_title . '</a></span><span class="catmandate" >' . date_format(date_create($post->post_date), "F j, Y") . '</span>';
				echo '<p class="catmanactions" ><a href="javascript:void(0);" class="catmanremoveaction" postID="'.$post->ID.'" termID="'. $post->term_taxonomy_id  .'" id="catmanremovepost'. $post->ID .'" title="Remove post from this category">Remove</a> | ';
				echo edit_post_link('Edit Post', '', '', $post->ID);
				echo '</p></div>';
			 }
		}
		else
		{
			echo '<strong>No posts found</strong>';
		}
	}

	public static function render_postcount($termID)
	{
		$count = wpcm_functions::get_postCount($termID);

		echo '<span id="wpcmpostcount" style="display: none;">'.$count.'</span>';
	}


	/*
	 * Returns a list of all the terms defined for the specified taxonomy
	 */
	public static function get_termList($taxonomy)
	{
		global $wpdb;

		$wpdb->show_errors();

		$querystr = "select wt.name, wt.term_id
						from $wpdb->terms wt
						join $wpdb->term_taxonomy wtt on wtt.term_id = wt.term_id
						where wtt.taxonomy = '$taxonomy'
						order by wt.name";

		$termList = $wpdb->get_results($querystr);
		return $termList;
	}

	/*
	 * Returns an indexed array containing the distinct list of taxonomies available in the installation
	 */
	public static function get_taxonomyList()
	{
		// As of WP3.0 get_taxonomy function exists, so might as well use it
		// for older versions, do it the hard way by querying the database yourself
		if(function_exists('get_taxonomies'))
		{
			return get_taxonomies();
		}
		else
		{
			global $wpdb;

			$wpdb->show_errors();

			$querystr = "select distinct taxonomy
					from $wpdb->term_taxonomy";


			$taxonomylist = $wpdb->get_col($querystr);
			return $taxonomylist;

		}
	}
}
endif;

?>
