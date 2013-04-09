<?php
/*
 * This class acts as the interface to the wordpress options table and is used to get and set the option values
 * for the current plugin.
 * It is a simple wrapper around the WordPress Options API such that it abstracts out the maintenance
 * of a single options array for a given plugin.
 * ToDo : refactor the class such as the options array maintained by this class is defined by the
 * 			plugin using this class. Right now it is hardcoded to maintain the specific options array
 *			associated with the category manager.
 */
if ( !class_exists('wpcm_options') ) :

class wpcm_options
{
	private static $db_option = 'CategoryManager_options';

	// handle the settings/options page
	public static function render_option_settings()
	{
	    $options = self::set_options();

	    if( isset($_POST['submitted']))
	    {
		    $options = array();
		    $options['OnDashboard'] = $_POST['ondashboard'];
		    $options['showConfirm'] = $_POST['showConfirm'];
		    $options['postsperpage'] = $_POST['postsperpage'];
		    $options['enableDropdown'] = $_POST['enableDropdown'];

		    $options['selectedTaxonomy'] = $_POST['taxSelect'];

			$termPostVal = 'default' . $_POST['taxSelect'] . 'term';

		    $options['defaultTerm'] = $_POST[$termPostVal];

		    update_option(self::$db_option, $options);

		    echo '<div class="updated"><p>Settings Saved</p></div>';
	    }

	    $ondash = $options['OnDashboard']=='on' ? 'checked' : '';
	    $showConfirm = $options['showConfirm']=='on' ? 'checked' : '';
	    $defaultTerm = $options['defaultTerm'];
	    $postsPerPage = $options['postperpage'];
	    $enableDropdown = $options['enableDropdown']=='on' ? 'checked' : '';
	    $selectedTaxonomy = $options['selectedTaxonomy'];

	    $action_url = $_SERVER['REQUEST_URI'];

	    $ppplist = CategoryManager::get_postsPerPage_selectBox();

	    include('wpcm-settingsPage.php');

	}

	// Save/Update the options from the DB
	public static function set_options()
	{
		$options = array
		(
			'OnDashboard' => 'on',
			'showConfirm' => 'on',
			'defaultTerm' => '',
			'postsperpage' => -1,
			'enableDropdown' => 'on',
			'selectedTaxonomy' => 'category'
		);

		$saved = get_option(self::$db_option);

		if(!empty($saved))
		{
			foreach($saved as $key => $option)
			{
				$options[$key] = $option;
			}
		}

		if($saved != $options)
		{
			update_option(self::$db_option, $options);
		}

		return $options;
	}

	// Retrieve the value of a specific option from the plugin's option set
	public static function get_option($optionName)
	{
		$options = self::set_options();

		return $options[$optionName];
	}

	// removes any option entries associated with the plugin from the options table
	public static function delete_options()
	{
		delete_option(self::$db_option);
	}
}
endif;

?>