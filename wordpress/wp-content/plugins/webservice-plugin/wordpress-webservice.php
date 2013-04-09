<?php
if(isset($_GET['webservice_method']))
{	
	$cases = $_GET['webservice_method'];
	switch($cases)
	{
	case category :
	{
	
	fetch_category();
	break;
	}
	case cat_id :
		{
	
	fetch_catid($_GET['cat_id']);
	break;
	}
	
	default:
	{
		$data = array(
					'response' => 'INVALID_WEBSERVICE'
		);
		echo json_encode($data);exit;
	}
  }
}
?>
