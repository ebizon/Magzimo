// test
QueryString = function () {
 		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
		query_string[pair[0]] = pair[1];
    	// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		var arr = [ query_string[pair[0]], pair[1] ];
		query_string[pair[0]] = arr;
   		} else {
		query_string[pair[0]].push(pair[1]);
		}
		} 
		return query_string;
		} ;
		/////////////////// change orientation function for /////////

	
function change_orientation() {
	
	if (!isNaN(window.orientation)) {
    	//orientation = (window.orientation == 0 || window.orientation == 180) ? "portrait" : "landscape";
    	if(window.orientation ==0 || window.orientation ==180){
			orientation = 'portrait';
		}else{
			orientation = 'landscape';
		}
    	
    } else {
		if($(window).width() < 980){
			orientation = 'portrait';
		}
		else{
			orientation = 'landscape';
		}
   	    //orientation = ($(window).width() < 980) ? "portrait" : "landscape";
	}
  
 
}


/////////////////////////////////
jQuery.extend({
    getValues: function() {
        var result = null;
        arg = QueryString().catid;
        url1 = base_url+'/wordpress/?webservice_method=cat_id&cat_id='+arg;
        $.ajax({
            url: url1,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
				
               result = data;
               //$("#mydiv").html("mytesting");
              //alert((data[0].title));
            }
        });
       return result;
    }
});
$(document).ready(function(){
result = $.getValues();
change_orientation();
landscape_content = new Array();
post_content = new Array();
post_id = new Array();
all_group_names = new Array();
group_name = new Array();
group_post_ids = new Array();
portrait_image  = result.first_image;
landscape_image = result.second_image;
check = new Array();
cover_image = '';
i1=0;
for(i=0;i<result.my.length;i++)
{
	post_content[i] = result.my[i].post_content;
	post_id[i] = result.my[i].post_id;
	landscape_content[i] = result.my[i].landscape_content;
	if(result.my[i].post_group_name != null && inarray(result.my[i].post_group_name,group_name) ){
	group_name[i1] = result.my[i].post_group_name;
	i1++;
	}
	
}

	function inarray(arg1,arg2)
	{
		if(arg2.length == 0)
		{
			return true;
		}
			for(z=0;z<arg2.length;z++){
				if(arg2[z] == arg1){
					
					return false;
					}
				}
				return true;
	}

for(i=0;i<result.groups.length;i++)
	{
		all_group_names[i] = result.groups[i].all_group_name;
		group_post_ids[i] = result.groups[i].post_ids;
		
	}


});
window.onorientationchange = function() {
	change_orientation();		
}




re = '';rew = {};
function bcall()
{	
	//alert(re.demo.html);
	re ={
		unavailable:{
					html:"<p style='font-family:helvetica;text-align:center;'><img src='#bundlepath#/images/warn.png'><br><br>Sorry!<br><br>The resolution of your device is not suitable<br>for <b>#magazinetitle#</b> issue <b>#magazinenumber#</b>.</p>"
		},
		landscapcover_images:{html:"<img src = "+landscape_image+">"},
		portraitcover_images:{html:"<img src = "+portrait_image+">"}
	};
	for(i=0;i<post_id.length;i++)
	{	
		rew = { };
		///// for portrait//////////
		name1 = new Object();
		name3 =  'portrait_page'+post_id[i];		
		name2 = post_content[i];
		name1 = {'html' : name2};		
		rew[name3] = name1;
		////////// for landscape/////////
		name11 = new Object();
		name31 =  'landscape_page'+post_id[i];		
		name21 = landscape_content[i]
		name11 = {'html' : name21};		
		rew[name31] = name11;
		$.extend(re, rew);
		
	}
	
	
	return re;
}
function b1call()
{
	article1 = {
			unavailable:{	
				metadata:{
					dontsavepositions:true				
					// If switched to true the "last seen page" cookie is not persisted when the user
					// see this "version" of the magazine. Is a nice trick if you want to have
					// a landscape only magazine and you want to show just a message to warn the
					// user that if is using the device in portrait mode. If he switch back to the
					// right side, the last valid page is shown again - making this "version" of the
					// magazine just like a "message box". Just remember to catch the supported
					// resolution on the "versions" section and add the "just a messagebox" version
					// as fallback entry.
					// You can switch this on also if you don't want to save the last seen page for
					// your magazine.
				},
				sections:[{id:"unavailable",title:"Magazine unavailable"}],
				articles:{
					unavailable:[
						{
							title:"Magazine unavailable",
							pages:['unavailable']
						}
					]
				}
			},

			/*
			 * The "bookmarklet me" version. Contains just a page with a message explaining
			 * how to add to the iPhone/iPad home screen the magazine.
			 */
			
			landscapedefaultversion:{
				
				/*
				 * Magazine sections. They have an ID, a title and a subtitle.
				 */
				metadata:{
					// You can define a custom action to be done when double-clicking on the page.
					// If not defined, the default GUI bars are toggled (like calling
					// browse.togglegui(); )
					//ondoubletap:function(){alert("double clicked!")}
					
					// You can disable the automatic pan animation when you've to cross a lot of
					// pages. Just define the variable above to set the maximum numbers of pages
					// to be animated.
					//pangapthreshold:3
				},
				sections:[
					{id:"rollingstart",title:"Rolling start",subtitle:""}
				],
				
				/*
				 * The gui details. It appears doubletapping on a page.
				 */
				gui:{
				
					/*
					 * Header related. The header is the upper bar.
					 */
					//headerheight:74,
					
					/* You can use all the global placeholders available for the pages too.
					 * The most common are:
					 *
					 * #magazinenumber#: magazine number
					 * #sectionsubtitle#: current section subtitle
					 * #sectiontitle#: current section title
					 * #magazinetitle#: magazine title
					 * #articletitle#: current article title
					 * #articlesubtitle#: current article subtitle
					 * #vertical# #verticalcount#: vertical position
					 * #horizontal# #horizontalcount#: horizontal position
					 * #orientation#: current orientation
					 *
					 */
					
					//headercontent:	"",
						//"<div class='magazineinfo'></div>",
					
					/*
					 * Extra bar. Is the lower bar and, while have ever the same size, its content can change from article to article.
					 */
					extrabarheight:140,
					
					/*
					 * Misc bars and indicators settings
					 */
					barheight:4,
					opacity:0.3,
					margin:4,
					bulletspacing:5,
					bulletsize:8,
					barheight:4,
					filled:"libs/bullet-full.png",
					empty:"libs/bullet-empty.png"
				},
				
				/*
				 * The single articles of this version. Articles are layouted horizontally.
				 */
				articles:{
					
					// The section name
					rollingstart:[
								{
							title:"Cover Image",
							subtitle:"Cover Image",
							pages:['landscapcover_images']
						},
					]					
				}
			},
			portraitdefaultversion:{
				
				/*
				 * Magazine sections. They have an ID, a title and a subtitle.
				 */
				metadata:{
					// You can define a custom action to be done when double-clicking on the page.
					// If not defined, the default GUI bars are toggled (like calling
					// browse.togglegui(); )
					//ondoubletap:function(){alert("double clicked!")}
					
					// You can disable the automatic pan animation when you've to cross a lot of
					// pages. Just define the variable above to set the maximum numbers of pages
					// to be animated.
					//pangapthreshold:3
				},
				sections:[
					{id:"rollingstart",title:"Rolling start",subtitle:""}
				],
				
				/*
				 * The gui details. It appears doubletapping on a page.
				 */
				gui:{
				
					/*
					 * Header related. The header is the upper bar.
					 */
					//headerheight:74,
					
					/* You can use all the global placeholders available for the pages too.
					 * The most common are:
					 *
					 * #magazinenumber#: magazine number
					 * #sectionsubtitle#: current section subtitle
					 * #sectiontitle#: current section title
					 * #magazinetitle#: magazine title
					 * #articletitle#: current article title
					 * #articlesubtitle#: current article subtitle
					 * #vertical# #verticalcount#: vertical position
					 * #horizontal# #horizontalcount#: horizontal position
					 * #orientation#: current orientation
					 *
					 */
					
					//headercontent:	"",
						//"<div class='magazineinfo'></div>",
					
					/*
					 * Extra bar. Is the lower bar and, while have ever the same size, its content can change from article to article.
					 */
					//extrabarheight:140,
					
					/*
					 * Misc bars and indicators settings
					 */
					//barheight:4,
					//opacity:0.3,
					margin:4
					//bulletspacing:5,
					//bulletsize:8,
					//barheight:4,
					//filled:"libs/bullet-full.png",
					//empty:"libs/bullet-empty.png"
				},
				
				/*
				 * The single articles of this version. Articles are layouted horizontally.
				 */
				articles:{
					
					// The section name
					rollingstart:[
								{
							title:"Cover Image",
							subtitle:"Cover Image",
							pages:['portraitcover_images']
						},
					]					
				}
			}			
		};
	
		total1 = article1.landscapedefaultversion.articles.rollingstart.length;
		total = article1.portraitdefaultversion.articles.rollingstart.length;
		
		k=0;k2=0;
		group_id_arr = new Array();
				for(i2=0;i2<group_post_ids.length;i2++)
					{	
						for(j2=0;j2<group_post_ids[i2].length;j2++){
							group_id_arr[k2]=group_post_ids[i2][j2];
							k2++;
						}
					}
	for(i=0;i<post_id.length;i++){
			flag = false;
			

			if(group_name[i] != null){
				group_namee = group_name[i];
				for(z=0;z<all_group_names.length;z++){
					if(all_group_names[z] == group_namee){
						k=z;
						flag = true;
					}
				}
			}
			
		if( ( flag ) ){
			
						
					protraite1 = new Array();
					landscape1 = new Array();
				for(j=0;j<group_post_ids[k].length;j++){
					protraite1[j] = 'portrait_page'+group_post_ids[k][j];
					landscape1[j] = 'landscape_page'+group_post_ids[k][j];
					group_id_arr[j] = group_post_ids[k][j];
					
				}
				
				obj1 = new Object()
				obj1 = {"title":"gotopage","subtitle":"undefined","pages": protraite1};
				obj2 = new Object();
				obj2 = {"title":"gotopage","subtitle":"undefined","pages": landscape1};
				article1.landscapedefaultversion.articles.rollingstart[total1] = obj2;
				article1.portraitdefaultversion.articles.rollingstart[total] = obj1;
				//alert(obj2.pages);
				total++;total1++;k++;
		}else{
					
					flag2 = true;
					for(z2=0;z2<group_id_arr.length;z2++)
					{
						if(group_id_arr[z2] == post_id[i])
						{
							flag2 = false;
						}
					}
				if(flag2) {
					
					name1 = 'portrait_page'+post_id[i];	
					name12 = 'landscape_page'+post_id[i];	
					obj1 = new Object()
					obj1 = {"title":"gotopage","subtitle":"undefined","pages": [name1]};
					obj2 = new Object();
					obj2 = {"title":"gotopage","subtitle":"undefined","pages": [name12]};
					article1.landscapedefaultversion.articles.rollingstart[total1] = obj2;
					article1.portraitdefaultversion.articles.rollingstart[total] = obj1;
					total++;total1++;
				}
			
			
				
			
			}
	}
	
  	return article1;
}



