<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function init_customTaxonomies() {
  // create a "movies" new taxonomy
  register_taxonomy(
    'movies',
    'post',
    array(
      'label' => __('Movies'),
      'sort' => true,
      'args' => array('orderby' => 'term_order'),
      'rewrite' => array('slug' => 'movie'),
    )
  );

  // create a "movies" new taxonomy
  register_taxonomy(
    'songs',
    'post',
    array(
      'label' => __('Songs'),
      'sort' => true,
      'args' => array('orderby' => 'term_order'),
      'rewrite' => array('slug' => 'song'),
    )
  );
}

add_action( 'init', 'init_customTaxonomies' );




?>
