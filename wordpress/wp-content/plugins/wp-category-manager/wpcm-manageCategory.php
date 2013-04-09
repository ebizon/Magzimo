<?php
/*
 * This page is executed via an ajax call from the wordpress admin when actions are performed
 */

// Since this is an API Page, Set no caching. We dont want anything accidentally not updating. 
// ToDo: In a future revision, it would make sense to add a query string parameter similar to allowCache=true that would allow caching of calls to the API
if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
    header("Cache-Control: no-store, no-cache");
    header("Pragma: no-cache");
}

include_once('../../../wp-config.php');
include_once('../../../wp-load.php');
include_once('../../../wp-includes/wp-db.php');

include_once('wpcm-functions.php');
        
check_ajax_referer("wp-category-manager");

if($_REQUEST['action'] == 'remove' && (function_exists('current_user_can') ?  current_user_can('edit_posts') : true))
{
    $postId = $_POST['postID'];
    $termId = $_POST['termID'];

    wpcm_functions::remove_term($postId, $termId);
}


if($_REQUEST['action'] == 'getPosts')
{
    //var_dump($_GET['category']);
    wpcm_functions::render_posts(wpcm_functions::get_posts($_GET['termID'], $_GET['page']));
	wpcm_functions::render_postcount($_GET['termID']);
}

?>
