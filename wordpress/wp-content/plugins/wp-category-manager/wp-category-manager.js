jQuery(document).ready(function($)
{

	// These variables manage pagination
	var postsPerPage = parseInt(catmansettings.postsPerPage);
	var curPage = 0;
	var totalPosts = parseInt(jQuery('#wpcmpostcount').text());

	jQuery('.catmanfooter').append('<div class="catmanLoaderImage" ><img src="' +catmansettings.plugin_url + 'loader.gif" /></div>');

	jQuery('.catmanLoaderImage').hide();

	function registerRemoveAction()
	{
		jQuery('#wpcmpostcount').hide();

		jQuery('a.catmanremoveaction').click(function () {
			var postID = this.getAttribute('postID');
			var termID = this.getAttribute('termID');
			var node = document.getElementById('catmanagerpost' + postID);

			if( catmansettings.showConfirm != 'on'  || (catmansettings.showConfirm == 'on'
				&& confirm('Are you sure you want to remove the taxonomy from the post?')) )
				{
					$.ajax( {
						type: "POST",
						url: catmansettings.plugin_url + "wpcm-manageCategory.php",
						data: "action=remove&termID=" + termID + "&postID=" + postID +'&_ajax_nonce=' + catmansettings.nonce,
						success: function(msg){
							jQuery(node).fadeOut(500, null);
							jQuery('#wpcmpostcount').html(parseInt(jQuery('#wpcmpostcount').text())-1);
							jQuery('.catmanpostcount').html(
								'Total Posts: ' + jQuery('#wpcmpostcount').text()
							);
							totalPosts = totalPosts - 1;
						},
						error: function(msg){
							alert('Error :' + msg.responseText);
						}
					});
				}
		});
	}

    
	
	jQuery('.catmanpostcount').html(
		'Total Posts: ' + jQuery('#wpcmpostcount').text()
		);
	
	registerRemoveAction();
	
	jQuery('.catmanselection select').change(
			function(){
				var cat = this.value;
				jQuery('.catmanLoaderImage').css('top', jQuery('#catmanpostlist').height()/2).css('left',jQuery('#catmanpostlist').width()/2).show();
				
				jQuery('#catmanpostlist').fadeTo(200, 0.1).load(catmansettings.plugin_url + 'wpcm-manageCategory.php'
					,'action=getPosts&termID=' + cat + '&page=0&_ajax_nonce=' + catmansettings.nonce
					, function() {
						jQuery('#catmanpostlist').fadeTo(200, 1.0);
						jQuery('.catmanLoaderImage').hide();

						registerRemoveAction();
					    jQuery('.catmanpostcount').html(
								'Total Posts: ' + jQuery('#wpcmpostcount').text()
							);
						curPage=0; // This needs to occur before the call to manage Pagination
						totalPosts = parseInt(jQuery('#wpcmpostcount').text());
						managePagination();
						
						});
			});


	// If Pagination is disabled, or the total number of posts fit on one page, no need to show the footer
	function managePagination()
	{
		if(postsPerPage == '-1' || totalPosts <= postsPerPage)
		{
			jQuery('.catmanfooter').hide();
		}
		else  // Pagination is enabled
		{
			jQuery('.catmanfooter').show();
			jQuery('.catmannextPage').show();
			jQuery('.catmanpreviousPage').show();

			// on the first page no need for the previous link.
			if(curPage==0)
			{
				jQuery('.catmanpreviousPage').hide();
			}
			else
			{
				// It isn't the initial render, and pagination
				// So show the previous button
				jQuery('.catmanpreviousPage').show();
				jQuery('.catmannextPage').show();

				// now decide if you want to show next
				if((curPage+1) * postsPerPage >= totalPosts)
				{
					jQuery('.catmannextPage').hide();
				}
			}
		}
	}

	managePagination();

	jQuery('.catmannextPage a').click(function(){
					var termId = jQuery('.catmanselection select').val();
					curPage = curPage + 1;
					jQuery('.catmanLoaderImage').css('top', jQuery('#catmanpostlist').height()/2).css('left',jQuery('#catmanpostlist').width()/2).show();
					jQuery('#catmanpostlist').fadeTo(200, 0.1).load(catmansettings.plugin_url + 'wpcm-manageCategory.php'
					,'action=getPosts&termID=' + termId + '&page=' + curPage  + '&_ajax_nonce=' + catmansettings.nonce
					, function() {
						jQuery('#catmanpostlist').fadeTo(200, 1.0);
						jQuery('.catmanLoaderImage').hide();
						registerRemoveAction();
					    jQuery('.catmanpostcount').html(
								'Total Posts: ' + jQuery('#wpcmpostcount').text()
							);
						totalPosts = parseInt(jQuery('#wpcmpostcount').text());
						managePagination();
						});
				});

	jQuery('.catmanpreviousPage a').click(function(){
					var termId = jQuery('.catmanselection select').val();
					curPage = curPage - 1;
					jQuery('.catmanLoaderImage').css('top', jQuery('#catmanpostlist').height()/2).css('left',jQuery('#catmanpostlist').width()/2).show();
					
					jQuery('#catmanpostlist').fadeTo(200, 0.1).load(catmansettings.plugin_url + 'wpcm-manageCategory.php'
					,'action=getPosts&termID=' + termId + '&page=' + curPage  + '&_ajax_nonce=' + catmansettings.nonce
					, function() {
						jQuery('#catmanpostlist').fadeTo(200, 1.0);
						jQuery('.catmanLoaderImage').hide();
						registerRemoveAction();
					    jQuery('.catmanpostcount').html(
								'Total Posts: ' + jQuery('#wpcmpostcount').text()
							);
						totalPosts = parseInt(jQuery('#wpcmpostcount').text());
						managePagination();
						});
				});

    // Manage the hiding and showing of various term drop down boxes based on the selected taxonomy
	function OnTaxonomyChanged()
    {
       
        jQuery('#termSelectBoxes > *').hide();

        // alert(jQuery('#taxSelectId option:selected').text());

        jQuery('#default' + jQuery('#taxSelectId option:selected').text() + 'termDiv').show();
    }

    OnTaxonomyChanged();
    
    jQuery('#taxSelectId').change(OnTaxonomyChanged);



 });

 
