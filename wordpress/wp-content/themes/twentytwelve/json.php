<?php
/*
Template Name: json
*/

/* require the user as the parameter */
if(isset($_GET['user']) && intval($_GET['user'])) {

  /* soak in the passed variable or set our own */
  $number_of_posts = isset($_GET['num']) ? intval($_GET['num']) : 10; //10 is the default
  $format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default
  $user_id = intval($_GET['user']); //no default

  /* connect to the db */
  global $wpdb;

  /* create one master array of the records */
  $posts = array();
  
  $the_query = new WP_Query( "author=$user_id&showposts=$number_of_posts" );

  while ( $the_query->have_posts() ) : $the_query->the_post();
         
		// add any extras that you would like to this array 
		$posts[] = array('title'=> get_the_title(),'content'=>get_the_content(),'link'=>get_permalink(get_the_ID()));
		
  endwhile;


  /* output in necessary format */
  if($format == 'json') {
    header('Content-type: application/json');
    echo json_encode(array('posts'=>$posts));
  }
  else {
    header('Content-type: text/xml');
    echo '<posts>';
    foreach($posts as $index => $post) {
      if(is_array($post)) {
        foreach($post as $key => $value) {
          echo '<',$key,'>';
          if(is_array($value)) {
            foreach($value as $tag => $val) {
              echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
            }
          }
          echo '</',$key,'>';
        }
      }
    }
    echo '</posts>';
  }

  /* reset query */
  wp_reset_postdata();
}
