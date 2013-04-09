<?php
/*
Plugin Name: Category Manager
Plugin URI: http://www.mustakes.com/wp-category-manager/
Description: This plugin makes it easier to manage the removal of a specific taxonomy term on posts. Mainly used when taxonomy terms are set to control display on a page.
Author: Mustansir Golawala
Version: 2.0.0.2
Author URI: http://www.mustakes.com/
*/

/*  Copyright 2010 Mustansir Golawala

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

include_once('wpcm-functions.php');
include_once('wpcm-options.php');
// Uncomment only when testing ! include_once('wp-test-customTaxonomies.php');

if ( !class_exists('CategoryManager') ) :

class CategoryManager
{
	var $plugin_url;

	function CategoryManager()
	{
		// Hook into the 'wp_dashboard_setup' action to register our other functions
		if(is_admin())
		{
			add_action('wp_dashboard_setup', array(&$this, 'add_dashboard_widgets') );

			$this->plugin_url = trailingslashit(WP_PLUGIN_URL.'/'.dirname(plugin_basename(__FILE__)));

			add_action('admin_menu', array(&$this, 'admin_menu'));
			add_action('wp_print_scripts', array(&$this, 'print_scripts'));
			add_action('admin_head', array(&$this, 'print_styles'));
		}
	}

	function add_dashboard_widgets()
	{
		if(wpcm_options::get_option('OnDashboard') == 'on' && (function_exists('current_user_can') ?  current_user_can('edit_posts') : true) )
		{
			wp_add_dashboard_widget('cat_manager_dashboard_widget'
				, 'Managing ' . wpcm_options::get_option('selectedTaxonomy')
				, array(&$this, 'dashboard_widget_render_function'));
		}
	}

	function dashboard_widget_render_function()
	{
		$term = wpcm_options::get_option('defaultTerm');
		$postlist = wpcm_functions::get_posts($term, 0);


		if(wpcm_options::get_option('enableDropdown') == 'on')
		{
			echo '<div class="catmanheader">';
		}
		else
		{
			echo '<div class="catmanheader" style="display:none;">';
		}

		echo '<span class="catmanpostcount"></span>';
		echo '<span class="catmanselection">';
		echo self::get_term_selectBox(wpcm_options::get_option('selectedTaxonomy'));
		echo '</span>';
		echo '</div>';


		echo '<div id="catmanpostlist" class="list:catmanpost" >';
		if($postlist)
		{
			 wpcm_functions::render_posts($postlist);
		}
		else
		{
			echo '<strong>No posts found</strong>';
			// We want to give the front end some indication of how many posts were found to be matching.
		}
		// We want to give the front end some indication of how many posts were found to be matching.
		wpcm_functions::render_postcount($term);
		echo '</div>';
		echo '<div class="catmanfooter">';
		echo '<span class="catmanpreviousPage"><a href="javascript:void(0);">[Prev]</a></span>  ';
		echo '<span class="catmannextPage"><a href="javascript:void(0);">[Next]</a></span>';
		echo '</div>';
	}

	// Set up default values
	function install()
	{
		if (version_compare(PHP_VERSION, '5.0.0', '<') )
		{
			exit("Sorry, this version of WP-Category-Manager will only run on PHP version 5 or greater!\n");
		}
		wpcm_options::set_options();
	}

	// Uninstall the options set for this plugin
	function uninstall()
	{
		wpcm_options::delete_options();
	}

	public static function get_postsPerPage_selectBox()
	{
		$pageOptions = array(-1,5,10,25,50);
		$postsPerPage = wpcm_options::get_option('postsperpage');

		$selectlist = '<select name="postsperpage">';

		foreach($pageOptions as $option)
		{
			$txt = $option==-1? 'Unlimited' : $option;
			if($option == $postsPerPage)
			{
				$selectlist = $selectlist . '<option value="' . $option . '" selected>' . $txt . '</option>';
			}
			else
			{
				$selectlist = $selectlist . '<option value="' . $option . '" >'	. $txt . '</option>';
			}
		}
		$selectlist = $selectlist . '</select>';

		return $selectlist;

	}

	/*
	 * Return the HTML for a dropdown containing the term list for the specified Taxonomy
	 */
	public static function get_term_selectBox($taxonomy)
	{
		// Build Category list for the drop down menu
		$termlist = wpcm_functions::get_termList($taxonomy);

		if($termlist)
		{
			$selectlist = '<div id="default' . $taxonomy . 'termDiv">';

			$selectlist = $selectlist . '<select name="default' . $taxonomy . 'term">';

			foreach($termlist as $term)
			{
				if(strcmp($term->term_id, wpcm_options::get_option('defaultTerm'))  == 0)
				{

					$selectlist = $selectlist.'<option value="' . $term->term_id . '" selected>' . $term->name . '</option>';
				}
				else
				{
					$selectlist = $selectlist. '<option value="' . $term->term_id . '" >' . $term->name . '</option>';
				}
			}
			$selectlist = $selectlist. '</select> </div>';

			return $selectlist;
		}
	}

	/*
	 * Return the HTML for a dropdown containing the list of all taxonomies specified on the system
	 */
	public static function get_tax_selectBox()
	{
		$taxList = wpcm_functions::get_taxonomyList();

		if($taxList)
		{
			$selectList = '<select name="taxSelect" id="taxSelectId" >';
			foreach($taxList as $tax)
			{
				if(strcmp($tax, wpcm_options::get_option('selectedTaxonomy')) == 0)
				{
					$selectList = $selectList . '<option value="' . $tax . '" selected>' . $tax . '</option>';
				}
				else
				{
					$selectList = $selectList . '<option value="' . $tax . '" >' . $tax . '</option>';
				}
			}
			$selectList = $selectList . '</select>';

			return $selectList;
		}
	}

	public static function render_taxonomyTermSelectionDropDowns()
	{
		echo CategoryManager::get_tax_selectBox();

		$taxList = wpcm_functions::get_taxonomyList();

		echo '<br /><h3>Default Term</h3><p>You can specify the default term you wish to show up on the dashboard widget</p>';

		echo '<div id="termSelectBoxes">';
		foreach($taxList as $taxonomy)
		{
			echo CategoryManager::get_term_selectBox($taxonomy);
		}
		echo '</div>';
	}

	function admin_menu()
	{
		add_options_page('Category Manager Options', 'Category Manager', 8, basename(__FILE__), array('wpcm_options', 'render_option_settings'));
	}

	function print_scripts()
	{
		$nonce = wp_create_nonce("wp-category-manager");

		wp_enqueue_script('jquery');
		wp_enqueue_script('categoryManager_script', $this->plugin_url . 'wp-category-manager.js', array('jquery'));


		// pass parameters to the js
		wp_localize_script('categoryManager_script', 'catmansettings'
				,  array('plugin_url' => $this->plugin_url
				, 'postsPerPage' =>wpcm_options::get_option('postsperpage')
				, 'showConfirm' => wpcm_options::get_option('showConfirm')
				,'nonce' => $nonce));

	}

	function print_styles()
	{
		wp_enqueue_style('categoryManager_css', $this->plugin_url . 'wp-category-manager.css');
		wp_print_styles(array('categoryManager_css'));
	}
}

endif;

if ( class_exists('CategoryManager') ) :

	$categoryManager = new CategoryManager();
	if (isset($categoryManager)) {
		register_activation_hook( __FILE__, array(&$categoryManager, 'install') );
		register_deactivation_hook(__FILE__, array(&$categoryManager, 'uninstall') );
	}

endif;


?>
