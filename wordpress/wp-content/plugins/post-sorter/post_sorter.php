<?php
/*
  Plugin Name: Post Sorter
  Plugin URI: http://intellisys.org/
  Description: Plugin for easy sorting of posts and pages by numeric value, both ascending and descending.
  Version: 1.0
  Author: Lyubomir Gardev
  Author URI: http://rolice.intellisys.info/
  Text Domain: post_sorter
  License: GPLv2 or later
*/

define('POST_SORTER_META_KEY',                      'post_sorter_order');

class PostSorter {
    
    public function __construct() {
        $this->init();
    }
    
    public function init() {
        load_plugin_textdomain('post_sorter', false, plugin_dir_path( __FILE__ ));
        
        add_filter('manage_posts_columns', array($this, 'add_sorter_column'));
        add_filter('manage_pages_columns', array($this, 'add_sorter_column'));
        
        add_action('manage_posts_custom_column', array($this, 'show_sorter_column'));
        add_action('manage_pages_custom_column', array($this, 'show_sorter_column'));
        
        add_filter('manage_edit-post_sortable_columns', array($this, 'add_sorter_sort'));
        add_filter('manage_edit-page_sortable_columns', array($this, 'add_sorter_sort'));
        
        add_filter('request', array($this, 'order_by'));
        
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post', array($this, 'attach_on_save'));

        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        add_action('wp_ajax_save_sort_position', array($this, 'save_sort_position'));
        add_action('wp_ajax_move_sort_post', array($this, 'move_post'));
        
        add_filter('posts_join', array($this, 'join_front'));
        add_filter('posts_orderby', array($this, 'order_by_front'));
 
        
        
        /* == = = = = = = = = = = ADMIN STUFF = = = = = = = = = = == */
        
        if(!is_admin())
            return;
        
        add_action('admin_menu', array($this, 'add_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    public function activate() {
        update_option('post_sorter_enabled', true);
        update_option('post_sorter_direction', 'ASC');
        
        $args = array(
            'numberposts' => -1,
            'post_type' => array('post', 'page'),
            'post_status' => array('publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash')
        );
        
        $posts = get_posts($args);
        
        foreach ($posts as $post) {            
            $current = get_post_meta($post->ID, POST_SORTER_META_KEY, true);
            
            if($current || $current === 0)
                continue;
            
            update_post_meta($post->ID, POST_SORTER_META_KEY, 0);
        }
    }
    
    public function deactivate() {
    }
    
    public function enqueue_scripts() {
        wp_register_style('post_sorter', plugin_dir_url( __FILE__ ) . 'css/style.css');
        wp_enqueue_style('post_sorter');
        
        wp_enqueue_script('post_sorter', plugin_dir_url( __FILE__ ) . 'js/common.js');
    }
    
    public function add_sorter_column($columns) {        
        $columns['sort'] = 'Sorting';
        return $columns;
    }
    
    public function show_sorter_column($name) {
        global $post;
        
        switch($name)
        {
            case 'sort':
                $this->render_sort_cell();
                break;
        }
    }
    
    public function render_sort_cell() {
        global $post;
        
        $html = '<div class="post_sorter">';
        $val = (int) get_post_meta($post->ID, POST_SORTER_META_KEY, true);
        
        $html .= '<a href="#" title="' . __( 'Move this element up', 'post_sorter' ) . '" class="up icon_button"
            onclick="post_sorter_moveUp(' . $post->ID . '); return false;"></a>';
        $html .= '<a href="#" title="' . __( 'Move this element down', 'post_sorter' ) . '" class="down icon_button"
            onclick="post_sorter_moveDown(' . $post->ID . '); return false;"></a>';
        
        $html .= '<input name="post_sorter_inline[]" id="post_sorter_inline_' . $post->ID . '" type="text" value="' . $val . '" class="inline_field"
            onkeyup="return post_sorter_saveOnKeyUp(event, this, ' . $post->ID . ')" onblur="post_sorter_save(this, ' . $post->ID . ')" />';
        
        $html .= '</div>';
        
        echo $html;
    }
    
    public function add_sorter_sort($columns) {
        $columns['sort'] = 'sort';
 
	return $columns;
    }
    
    public function order_by($vars) {
        if(!isset($vars['orderby']) || 'sort' != $vars['orderby'])
            return $vars;
        
        $direction = mb_strtoupper(get_option('post_sorter_direction')) == 'DESC' ? ' DESC' : '';
        
        $vars = array_merge($vars, array(
            'meta_key' => POST_SORTER_META_KEY,
            'order_by' => 'meta_value_num' . $direction
            
        ));
        
        return $vars;
    }
    
    public function join_front($sql) {
        global $wpdb;
        
        if(!get_option('post_sorter_enabled'))
            return $sql;
        
        $sql .= "INNER JOIN {$wpdb->postmeta} AS post_sorter ON ({$wpdb->posts}.ID = post_sorter.post_id AND post_sorter.meta_key = '" . POST_SORTER_META_KEY . "')";
               
        return $sql;
        
    }
    
    public function order_by_front($sql) {
        global $wpdb;
        
        if(!get_option('post_sorter_enabled'))
            return $sql;
        
        $direction = mb_strtoupper(get_option('post_sorter_direction')) == 'DESC' ? ' DESC' : '';
        
        return 'post_sorter.meta_value' . $direction . ($sql ? ', ' . $sql : '');
    }
    
    public function save($post_id, $position) {
        $post_id = (int) $post_id;
        $position = (int) $position;
        
        if($post_id <= 0 || $position == 0)
            return;
        
        $result = new stdClass();
        
        $result->result = update_post_meta($post_id, POST_SORTER_META_KEY, $position);
        
        if($result->result) {
            $result->post_id = $post_id;
            $result->position = $position;
        }
        
        die(json_encode($result));
    }
    
    public function add_menu() {
        add_menu_page('Page Sorter :: General', 'Page Sorter', 'administrator', 'page-sorter', array($this, 'render_menu'));
    }
    
    public function render_menu() {
        include(plugin_dir_path( __FILE__ ) . 'page/general.php');
    }
    
    public function register_settings() {
    }
    
    public function save_sort_position() {
        $post_id = (int) $_POST['post_id'];
        $position = (int) $_POST['position'];
        
        $this->save($post_id, $position);
    }
    
    public function add_meta_box() {
        add_meta_box('post_sorter', __( 'Post Sorter', 'post_sorter' ), array($this, 'render_meta_box'), null, 'side', 'core');
    }
    
    public function render_meta_box( $post ) {
        wp_nonce_field( plugin_basename( __FILE__ ), 'post_sorter' );
        
        $html = '<div class="post_sorter">';
        $val = (int) get_post_meta($post->ID, POST_SORTER_META_KEY, true);
        
        $html .= __( 'Position Factor', 'post_sorter' ) . ': ';
        
        $html .= '<input name="post_sorter_inline[]" id="post_sorter_inline_' . $post->ID . '" type="text" value="' . $val . '" class="inline_field"
            onkeyup="return post_sorter_saveOnKeyUp(event, this, ' . $post->ID . ');" onblur="post_sorter_save(this, ' . $post->ID . ')" />';
        
        $html .= '</div>';
        
        echo $html;
    }
    
    public function save_settings() {
        if(!current_user_can('manage_options'))
            return;
        
        if(empty($_POST))
            return;
        
        update_option('post_sorter_enabled', isset($_POST['post_sorter_enabled']));
        update_option(
            'post_sorter_direction',
            isset($_POST['post_sorter_direction']) && mb_strtoupper($_POST['post_sorter_direction'] == 'DESC')
            ?   'DESC'
            :   ''
        );
    }
    
    private function move($post_id, $direction = 'down') {
        global $wpdb;
        
        $post_id = (int) $post_id;
        
        if($post_id <= 0)
            return false;
        
        $sort_direction = mb_strtoupper(get_option('post_sorter_direction')) == 'DESC' ? ' DESC' : '';
        $current = (int) get_post_meta($post_id, POST_SORTER_META_KEY, true);
	
	$factor = (bool) $sort_direction ^ $direction == 'down';
        
        $sign_compare = $factor ? '>' : '<';
        $sign_modify = $factor ? '+' : '-';
        
        $post = get_post($post_id);
        
        $sql = "
            SELECT
                pm.meta_value {$sign_modify} 1
            FROM {$wpdb->posts} AS p
            INNER JOIN {$wpdb->postmeta} AS pm ON (p.ID = pm.post_id AND pm.meta_key = '" . POST_SORTER_META_KEY . "')
            WHERE
                p.post_type = '{$post->post_type}'
            AND
                p.post_status = '{$post->post_status}'
            AND
                pm.meta_value {$sign_compare} {$current}
            GROUP BY
                pm.meta_value
            ORDER BY
                (pm.meta_value {$sign_modify} 1) {$sort_direction},
                pm.meta_value{$sort_direction}
            LIMIT 1
        ";
                
        $target = (int) $wpdb->get_var($sql);
        
        return array(
	    'sql' => $sql,
            'target' => $target,
	    'factor' => $factor,
            'result' => $target != 0 ? (bool) update_post_meta($post_id, POST_SORTER_META_KEY, $target) : false
        );
    }
    
    public function move_up($post_id) {
        return $this->move($post_id, 'up');
    }
    
    public function move_down($post_id) {
        return $this->move($post_id);
    } 
    
    
    
    /* == = = = = = = = = = = AJAX HANDLERS  = = = = = = = = = = == */
    
    public function attach_on_save($post_id) {
        $post_id = (int) $post_id;
        
        if($post_id <= 0)
            return;
        
        if(defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE) 
            return;
        
        if(!wp_verify_nonce( isset($_POST['post_sorter']) ? $_POST['post_sorter'] : '', plugin_basename( __FILE__ ) ))
            return;
        
        if(!current_user_can( 'edit_post', $post_id ))
            return;
        
        $position = $_POST['post_sorter_inline'];
        
        if(is_array($position) && !empty($position))
            $position = $position[0];
        
        $position = (int) $position;
        
        update_post_meta($post_id, POST_SORTER_META_KEY, $position);
    }
    
    public function move_post() {
        $post_id = isset($_POST['post_id']) ? (int) $_POST['post_id'] : 0;
        $direction = isset($_POST['direction']) && mb_strtolower($_POST['direction']) == 'up' ? 'up' : 'down';
        
        if($post_id <= 0)
            die(json_encode( array( 'result' => '0', 'message' => __('Invalid post selected.', 'post_sorter') ) ));
        
        $data = $this->move($post_id, $direction);
        
        $result = new stdClass();
	
	if(is_array($data))
	foreach($data as $key => $value)
	    $result->$key = $value;
        
        die(json_encode($result));
    }
    
}

$post_sorter = new PostSorter();

if(!isset($post_sorter) || !is_object($post_sorter) || get_class($post_sorter) != 'PostSorter')
    return;

register_activation_hook( __FILE__, array( $post_sorter, 'activate' ) );
register_deactivation_hook( __FILE__, array( $post_sorter, 'deactivate' ) );

?>
