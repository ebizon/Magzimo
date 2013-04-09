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

jQuery.extend({
    getValues: function() {
        var result = null;
        arg = QueryString().catid;
        url1 = 'http://localhost/wordpress/?webservice_method=cat_id&cat_id='+arg;
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
result = $.getValues();

post_content = new Array();
post_id = new Array();


for(i=0;i<result.my.length;i++)
{
	post_content[i] = result.my[i].post_content;
	post_id[i] = result.my[i].post_id;
	//alert(post_id[i]);
	
}


re = '';rew = {};
function bcall()
{	
	//alert(re.demo.html);
	re ={

	// The "magazine" unavailable page. Since is quite simple, its HTML is built-in
	unavailable:{
		html:"<p style='font-family:helvetica;text-align:center;'><img src='#bundlepath#/images/warn.png'><br><br>Sorry!<br><br>The resolution of your device is not suitable<br>for <b>#magazinetitle#</b> issue <b>#magazinenumber#</b>.</p>"
	},
	bookmarklet:{
		html:"<p style='font-family:helvetica;text-align:center;'><img src='#bundlepath#/images/warn.png'><br><br>Add me to your home screen!<br><br>Hit the + icon on the bottom bar<br>and add this page to<br>your Home Screen to start reading<br><b>#magazinetitle#</b> issue <b>#magazinenumber#</b>.</p>"
	},

	// The magazine pages.
	cover:{
		// You can specify a stack of page templates, defined into browse._magazine.templates.
		template:["cover"],
		// These placeholders are replaced from the page once the layers are stacked.
		placeholders:{
			header:"&laquo;Why don't try to make everything in HTML/JS/CSS?&raquo;",
			subheader:"KesieV, 1 november 2010",
			details:"The very first issue of <i>#magazinetitle#</i>!<br><br>In this issue, a little taste of a lot of things you can do with <b>#toolname#</b>!",
			credits:"<i>#magazinetitle#</i> is the example magazine for <i>#toolname#</i>. &copy;2011 KesieV - All rights reserved - <i>#toolname#</i> is #toollicense# licensed."
		}
	},
	// This is a single page, without layers and placeholders
	howto:{file:"issues/demo-issue/custompages/howto.html"},	
	welcome:{
		// Multiple layers...
		template:["defaultheader","articletopfull"],
		// ...and external placeholders
		placeholders:"issues/demo-issue/articles/welcome.txt",
	},
	
	
	credits:{
		template:["defaultfooter","articlebottomtextonly","widgetthankyoubullet"],
		placeholders:{article:"#magazinecredits#"}
	},
	yourface:{
		template:["defaultsolo","articlesololeft","widgetrightface"],
		placeholders:"issues/demo-issue/articles/yourface.txt",
	},
	highfive:{
		template:["defaultsolo","articlesoloright","widgetrightphotos"],
		placeholders:"issues/demo-issue/articles/highfive.txt"
	},
	workflowlandscape:{
		template:["defaultheader","articletopbottom","widgettop6scrolly"],
		placeholders:"issues/demo-issue/articles/workflow.txt",
	},
	workflowportrait:{
		template:["defaultheader","articletopright","widgetleft6scrolly"],
		placeholders:"issues/demo-issue/articles/workflow.txt",
	},
	fiches:{
		template:["defaultfooter","articlebottomleft","widgetrightfiches"],
		placeholders:"issues/demo-issue/articles/fiches.txt",
	},
	multimediacomplex:{
		template:["defaultheader","articletopleft","widgetrightcomplex"],
		placeholders:"issues/demo-issue/articles/multimediacomplex.txt",
	},
	youtubeclip:{
		template:["defaultfooter","articlebottomleft2","widgetrightyoutube"],
		placeholders:"issues/demo-issue/articles/multimediacomplex.txt",
	},
	multimediacomplexscroll:{
		template:["articlescrollmerge"],
		placeholders:"issues/demo-issue/articles/multimediacomplex.txt",
		scrollpage:true
	},
	blackboards:{
		template:["defaultheader","articletopsplit","widgetboards"],
		placeholders:"issues/demo-issue/articles/splitted.txt"				
	},
	brightboard:{
		template:["defaultmiddle"],
		html:"<div class='defaultfont brightbox' style='position:absolute;top:0px;left:31px;right:31px;bottom:0px;'><div style='float:left;width:50%;margin:30px 0px 0px 30px'><span class='title'>#pagetitle#</span></div><div  class='textbox' style='background-color:#000000;color:#ffffff;padding:20px;float:left;top:30px;width:50%;margin:30px 30px 0px 30px'>#article#</div></div>",
		placeholders:{
			pagetitle:"Probably the truth is in colors.",
			article:"<p>This is a mix of the techniques explained since now: this page is composed by the standard marked borders of the magazine on the sides, loaded from a template file as usual but the page layout is built-in into the issue file which has placeholders referenced into the issue files itself.</p><p>As you've understand, it is just a matter of mixing and getting creative. The <i>classname trick</i> explained before changes the page background and the text color. Try to change <i>your point of view</i> on this page too.</p><p>Plus! This box glows in the dark! Try to switch off the light in <i>portrait</i>!</p>"
		}
	},
	time:{
		template:["defaultfooter","articlebottomleft","widgettime"],
		placeholders:"issues/demo-issue/articles/chrono.txt"
	},
	hubpage:{
		template:["defaultheader","articletophub","widgettopindex"],
		placeholders:"issues/demo-issue/articles/hub.txt"				
	},
	geohubpage:{
		template:["defaultfooter","articlebottomhub","widgetbottomgeo"],
		placeholders:"issues/demo-issue/articles/geohub.txt"				
	},
	losingway:{
		template:["defaultsolo","articlesololeft","widgetrightlost"],
		placeholders:"issues/demo-issue/articles/losingway.txt"		
	},
	widgetover:{
		dontrasterize:true, // Since is fully animated, this page will never be rasterized if needed.
		file:"issues/demo-issue/custompages/over.html"
	},
	
	twoupotisone:{
		template:["defaultheader","articletoprightlong"],	
		placeholders:"issues/demo-issue/articles/twoup-otis.txt"		
	},
	twoupotistwo:{
		template:["defaultfooter","articlebottomfullfollow"],	
		placeholders:"issues/demo-issue/articles/twoup-otis.txt"		
	},
	twoupwhiteone:{
		template:["defaultsolo","articletopright","boxtopleft"],	
		placeholders:"issues/demo-issue/articles/twoup-white.txt"		
	},
	twoupsimoneone:{
		template:["defaultsolo","articletopright","boxtopleft"],	
		placeholders:"issues/demo-issue/articles/twoup-simone.txt"		
	},	
	twoupotis:{
		template:["articlescrollsimplemerge"],
		placeholders:"issues/demo-issue/articles/twoup-otis.txt",
		scrollpage:true
	},
	twoupwhocares:{
		template:["defaultsolo","articlesololeft","widgetrightfichescss"],
		placeholders:"issues/demo-issue/articles/twoup-whocares.txt",
	},
	twouporgcover:{
		file:"issues/demo-issue/custompages/org-cover.html"
	},
	
	
	/*
	 * MINI PAGES
	 */
	minicover:{
		// You can specify a stack of page templates, defined into browse._magazine.templates.
		template:["minicover"],
		// These placeholders are replaced from the page once the layers are stacked.
		placeholders:{
			header:"&laquo;Why don't try to make everything in HTML/JS/CSS?&raquo;",
			subheader:"KesieV, 1 november 2010",
			details:"The very first issue of <i>#magazinetitle#</i>!<br><br>In this issue, a little taste of a lot of things you can do with <b>#toolname#</b>!",
			credits:"<i>#magazinetitle#</i> is the example magazine for <i>#toolname#</i>. &copy;2011 KesieV - All rights reserved - <i>#toolname#</i> is #toollicense# licensed."
		}
	},
	minihowto:{file:"issues/demo-issue/custompages/mini/howto.html"},	
	miniwelcome:{
		template:["miniarticlefulltop","miniwidgetthankyoubullet"],
		placeholders:"issues/demo-issue/articles/welcome.txt",
		scrollpage:true
	},
	
	miniend:{file:"issues/demo-issue/custompages/mini/end.html"},	
	 
	
	/* 
	 * MODAL PAGES
	 * Are not used directly into the magazine but opened in modals. Modal views are just
	 * pages like the others!
	 * Since must be kept on the rasterized version too, we set the keeponrasterized:true property
	 * in order to copy them as is.
	 */
	// This is the "index" page. Modals like the index are just pages like the others.
	index:{keeponrasterized:true,widget:"rollindex",attrs:"sidemargin=250 thumbnailwidth=180 thumbnailmargin=10  thumbnailshadow=yes class='rollindex-default'"},	 
	infiniboard:{keeponrasterized:true,widget:"infiniboard",widgetcontent:"{w:749,h:305,img:'issues/demo-issue/images/infiniboard.png',squares:["+
		"{x:0,y:0,w:190,h:305,action:function(){widget.gotopage(null,'cover')}},"+
		"{x:190,y:0,w:130,h:150,action:function(){widget.gotopage(null,'howto')}},"+
		"{x:320,y:0,w:132,h:150,action:function(){widget.gotosheet(null,4,0)}},"+
		"{x:190,y:150,w:262,h:155,action:function(){widget.gotopage(null,'yourface')}},"+
		"{x:452,y:0,w:214,h:86,action:function(){widget.gotopage(null,'multimediacomplex')}},"+
		"{x:452,y:86,w:147,h:219,action:function(){widget.gotopage(null,'welcome')}},"+
		"{x:599,y:86,w:150,h:219,action:function(){widget.gotopage(null,'blackboards')}},"+
		"{x:666,y:0,w:84,h:86,action:function(){widget.gotopage(null,'widgetover')}}"+
		"]}"},
	fullscreenblackboard:{keeponrasterized:true,widget:"blackboard",style:"background-image:url('#bundlepath#/images/facebg.jpg')",attrs:"canvascolor='clear'"},
	fullscreenblackboardinverted:{keeponrasterized:true,widget:"blackboard",attrs:"canvascolor='black' pencolor='white' pensize=8"}

};
 
	for(i=0;i<post_id.length;i++)
	{
		name1 = new Object();
		name3 =  'page'+i;
		//alert(name3);
		name2 = post_content[i]
		
		name1 = {'html' : name2};
		rew = { };
		rew[name3] = name1;
		$.extend(re, rew);
	}
	

	
	return re;
}
function b1call()
{
	article1 = {
			/*
			 * The "magazine unavailable" version. Contains just a page with a message explaining
			 * that the magazine wasn't designed for the device the user is using
			 */
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
			bookmarklet:{	
				metadata:{
					dontsavepositions:true				
				},
				sections:[{id:"bookmarklet",title:"Bookmarklet me!"}],
				articles:{
					bookmarklet:[
						{
							title:"Bookmarklet me!",
							pages:['bookmarklet']
						}
					]
				}
			},
			
			
			/*
			 * The main version of our magazine.
			 */
			defaultversion:{
				
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
					pangapthreshold:3
				},
				sections:[
					{id:"rollingstart",title:"Rolling start",subtitle:"Something for getting started. An overview of #toolname#."},
					{id:"twoup",title:"2UP",subtitle:"Guest articles and extras just for #magazinetitle#, in english and italian."}
				],
				
				/*
				 * The gui details. It appears doubletapping on a page.
				 */
				gui:{
				
					/*
					 * Header related. The header is the upper bar.
					 */
					headerheight:74,
					
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
					
					headercontent:
						"<img src='#bundlepath#/images/logo.png'> <span class='magazinetitle'>#magazinetitle#</span> <span class='magazinenumber'>##magazinenumber#</span>"+
						"<div class='articlebox'><span class='sectiontitle'>#sectiontitle#</span><span class='magazinearticletitle'>#articletitle#</span><br><span class='magazinearticlesubtitle'>#articlesubtitle#</div></div>"+
						"<div class='buttonbox'><img src='#bundlepath#/images/index.png' onobjecttap=\"widget.showmodal('index')\"></div>"+
						"<div class='pagebox'>Article #vertical#/#verticalcount# Page #horizontal#/#horizontalcount# #orientation#</div>"
						,
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
						// Each item of this array is an article. Each article has a title, a subtitle and a set of pages.
						{
							title:"Cover",
							// A single page for this article
							pages:['cover'],
							// You can change page specifying the section name and the page...
							extra:"<div class='thumbbox'><span class='title' >Credits</span><br><img onobjecttap=\"widget.gotopage('rollingstart','credits')\" class='thumb' style='height:80px' src='#bundlepath#/thumbs/credits.png'><span class='description'>Check out the #magazinetitle# credits!</span></div>"+
							// ...or the section name and left and top coords on the magazine.
							// Coords can be numbers, "top" or "bottom" for the first and the last page and "left","right" for the left coords and "up","down" for the top coords.
							"<div class='thumbbox'><span class='title'>Spin the wheel!</span><br><img onobjecttap=\"widget.gotosheet('rollingstart',4,0)\" class='thumb' style='height:80px' src='#bundlepath#/thumbs/workflowlandscape.png'><span class='description'>Tokens to bet and wheels to spin! Check out the workflow casino!</span></div>"+
							"<div class='thumbbox'><span class='title'>Just draw it!</span><br><img onobjecttap=\"widget.gotopage('rollingstart','yourface')\" class='thumb' style='height:80px' src='#bundlepath#/thumbs/yourface.png'><span class='description'>#toolname# can help you creating your personal magazine, with your face on it! Just draw it!</span></div>"
						},
						{
							title:"Howto",
							// Titles and subtitles can have placeholders too.
							subtitle:"Learn how to browse #magazinetitle# with #toolname#.",
							pages:['howto']
						},
						{
							title:"Your face on it",
							subtitle:"At least your face can be on a cool magazine.",
							pages:['yourface']
						},
						{
							title:"Welcome, stranger!",
							subtitle:"Welcome to #magazinetitle# issue #magazinenumber#, the first magazine demo for #toolname#!",
							pages:['welcome','credits']
						},
						
						{
							title:"Workflow roulette",
							subtitle:"Bet on your favourite workflow and spin the wheel!",
							// Each page can have just a view for portrait or landscape or can be different.
							pages:[{portrait:'workflowportrait',landscape:'workflowlandscape'},'fiches']
						},
						{
							title:"High five",
							subtitle:"HTML5 makes everything spicy. Guess the taste!",
							pages:['highfive']
						},
						{
							title:"Multimedia Complex",
							subtitle:"Let's try to put together something old and new.",
							extra:"<div class='thumbbox'><span class='title' >Draw your face!</span><br><img onobjecttap=\"widget.gotopage('rollingstart','yourface')\" class='thumb' style='height:80px' src='#bundlepath#/thumbs/yourface.png'><span class='description'>The <i>blackboard</i> widget uses the <i>canvas</i> tag. Have a look!</span></div>",
							// Each page can have just a view for portrait or landscape or can be different.
							pages:[{portrait:'multimediacomplexscroll',landscape:'multimediacomplex'},{portrait:'multimediacomplexscroll',landscape:'youtubeclip'}]
						},
						{
							title:"Points of view",
							subtitle:"Getting creative mixing together technologies and fun. Changing points of view.",
							pages:['blackboards','brightboard','time']
						},
						{
							title:"You have been here.",
							subtitle:"In how many ways you can explain where you are?",
							pages:['hubpage','geohubpage']
						},
						{
							title:"Getting lost",
							subtitle:"Feeling alone? What to do next?",
							pages:['losingway']
						},
						{
							title:"Over.",
							subtitle:"Is this really over?",
							pages:['widgetover']
						},						
					],
					twoup:[
						{
							title:"L'editoria digitale e oltre.",
							subtitle:"L'editoria digitale che non esiste.",
							pages:[{portrait:'twoupotis',landscape:'twoupotisone'},{portrait:'twoupotis',landscape:'twoupotistwo'}]
						},
						{
							title:"Seriously. Who cares?",
							subtitle:"Mindless things about #toolname# and #magazinetitle# development.",
							pages:['twoupwhocares']
						},
						{
							title:"Literature on web",
							subtitle:"A new free field",
							pages:['twoupwhiteone']
						},
						{
							title:"The Cover. Unplugged.",
							subtitle:"Wondering how the original #magazinetitle# cover was during development? Voilat.",
							pages:['twouporgcover']
						},
						{
							title:"Fitting technologies",
							subtitle:"A good place for a <i>monotheistic's god</i> gift.",
							pages:['twoupsimoneone']
						}
					]
				}
			},
			mini:{
				/*
				 * The minified magazine (for smaller devices);
				 */
				metadata:{}, // Any particular metadata
				sections:[
					{id:"rollingstart",title:"Rolling start",subtitle:"Something for getting started. An overview of #toolname#."}
				],
				
				/*
				 * The gui details. It appears doubletapping on a page.
				 */
				gui:{
				
					/*
					 * Header related. The header is the upper bar.
					 */
					headerheight:64,
					
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
					
					headercontent:
						"<img src='#bundlepath#/images/logo.png'> <span class='magazinetitle'>#magazinetitle#</span> <span class='magazinenumber'>##magazinenumber#</span>"+
						"<div class='articlebox'><span class='sectiontitle'>#sectiontitle#</span><span class='magazinearticletitle'>#articletitle#</span></div>"
						,
						//"<div class='magazineinfo'></div>",
					
					/*
					 * Extra bar. Is the lower bar and, while have ever the same size, its content can change from article to article.
					 */
					extrabarheight:120,
					
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
						// Each item of this array is an article. Each article has a title, a subtitle and a set of pages.
						{
							title:"Cover",
							// A single page for this article
							pages:['minicover'],
							// You can change page specifying the section name and the page...
							extra:"<div class='minithumbbox'><span class='title' >Credits</span><br><img onobjecttap=\"widget.gotopage('rollingstart','miniwelcome')\" class='thumb' style='height:50px' src='#bundlepath#/thumbs/credits.png'><span class='description'>Check out the #magazinetitle# credits!</span></div>"
						},
						{
							title:"Howto",
							// Titles and subtitles can have placeholders too.
							subtitle:"Learn how to browse #magazinetitle# with #toolname#.",
							pages:['minihowto']
						},
						{
							title:"Welcome, stranger!",
							subtitle:"Welcome to #magazinetitle# issue #magazinenumber#, the first magazine demo for #toolname#!",
							pages:['miniwelcome']
						},
						
						
						{
							title:"The end... Already?",
							subtitle:"Try #magazinetitle# with a larger device!",
							pages:['miniend']
						},
						
											
					]
				}
			}
		};
	
		total1 = article1.defaultversion.articles.rollingstart.length;
		//alert(total1);
		total = article1.mini.articles.rollingstart.length;
	//alert(browse._current.pagedata+'sdsd');	
	for(i=0;i<post_id.length;i++){
		name1 = 'page'+i;	
		//alert(name1);
		obj1 = new Object()
			obj1 = {"title":"gotopage","subtitle":"undefined","pages": [name1]};
		obj2 = new Object()
			obj2 = {"title":"gotopage","subtitle":"undefined","pages": [name1]};
		article1.defaultversion.articles.rollingstart[total1] = obj2;
		article1.mini.articles.rollingstart[total] = obj1;
		total++;total1++;
		}
	
  	return article1;
}

