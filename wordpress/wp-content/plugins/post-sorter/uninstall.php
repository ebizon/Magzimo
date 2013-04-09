<?php 
// Prevents accidental unistall
if(!defined('WP_UNINSTALL_PLUGIN') || !WP_UNINSTALL_PLUGIN) exit;

delete_option('post_sorter_enabled');
delete_option('post_sorter_direction');
delete_option('post_sorter_metakey');

delete_post_meta_by_key('post_sorter_order');
?>