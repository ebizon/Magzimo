<?php
    global $post_sorter;

    if(!empty($_POST))
        $post_sorter->save_settings();
?>

<div id="icon-plugins" class="icon32"></div>

<div class="wrap">
    <h2><?php echo 'Post Sorter' ?></h2>
    
    <form id="post_sorter_settings" action="" method="post" class="post_sorter_form">
        <input name="post_sorter_enabled" id="post_sorter_enabled" type="checkbox" <?php checked(1, get_option('post_sorter_enabled'))?> /> <label for="post_sorter_enabled"><?php _e('Enable Post Sorter', 'post_sorter') ?></label><br /><br />

        <input name="post_sorter_direction" id="post_sorter_direction_asc" type="radio" value="ASC" <?php checked('', get_option('post_sorter_direction'))?> /> <label for="post_sorter_direction_asc"><?php _e('Sort Ascending', 'post_sorter') ?></label><br />
        <input name="post_sorter_direction" id="post_sorter_direction_desc" type="radio" value="DESC" <?php checked('DESC', get_option('post_sorter_direction'))?> /> <label for="post_sorter_direction_desc"><?php _e('Sort Descending', 'post_sorter') ?></label>
        
        <div class="controller">
            <a href="#"class="button-primary" onclick="jQuery('#post_sorter_settings').trigger('submit'); return false;"><?php _e('Save', 'post_sorter') ?></a>
        </div>
    </form>
</div>