/*
 * These are you magazine's CSSs.
 * Plugins can include more CSS if needed.
 */
browse.addcss("issues/common/style.css");

/*
 * Your magazine's plugins.
 * Usually can be mapped to DOM elements for making them dynamic.
 */
browse.addplugin("flipper");
browse.addplugin("scrolly");
browse.addplugin("chrono");
browse.addplugin("rollindex");
browse.addplugin("bullet");
browse.addplugin("blackboard");
browse.addplugin("dragboard");
browse.addplugin("audioclip");
browse.addplugin("fullscreenimage");
browse.addplugin("youtubeclip");
browse.addplugin("drawer");
browse.addplugin("geobox");
browse.addplugin("infiniboard");
browse.addplugin("pagelocker");
browse.addplugin("over");

/*
 * Your magazine metadata.
 */
browse._magazine.metadata={

	// Unique ID of your magazine and its version. Used for locally storing data.
	uid:"SAMPLEMAGAZINE0",
	version:1,
	
	// Issue related settings
	title:"Sample Magazine",
	number:"0",
	
	// Apple related settings
	splashiphone:{
		portrait:"issues/demo-issue/splash-iphone-port.png",
		landscape:"issues/demo-issue/splash-iphone-land.png"
	},
	splashipad:{
		portrait:"issues/demo-issue/splash-ipad-port.png",
		landscape:"issues/demo-issue/splash-ipad-land.png"
	},
	icon:{
		iphone:"issues/demo-issue/appicon-iphone.png",
		ipad:"issues/demo-issue/appicon-ipad.png"
	},
	apptitle:"SampleMag",
	
	// Custom placeholders. Create your customized magazine-wide placeholders here.
	placeholders:{
		magazinecredits:""
	}
};
// ---
// Copyright (c) 2011 Francesco Cottone, http://www.kesiev.com/
// ---
/*
 * These are the condition to be used to check the magazine version to show.
 * Is a set of checks that are done to the device when the magazine is loaded or the active surface changes size.
 * When one of the condition is true, the tests are stopped and the related version ID is used.
 * Use:
 *
 * {islandscape:true,id:"<versionname>"} to set a version if the device is in landscape mode
 * {isportrait:true,id:"<versionname>"} to set a version if the device is in portrait mode
 * {sizelessthan:{width:<width>,height:<height>},id:"<versionname>"} to set a version checking the maximum display size
 * {sizemorethan:{width:<width>,height:<height>},id:"<versionname>"} to set a version checking the minimum display size
 * {sizeis:{width:<width>,height:<height>},id:"<versionname>"} to set a version checking the exact display size
 * {isipad:true,id:"<versionname>"} to set a version for iPad only
 * {isiphone:true,id:"<versionname>"} to set a version for iPhone only
 * {isipod:true,id:"<versionname>"} to set a version for iPod only
 * {isstandalone:true,id:"<versionname>"} to set a version if the app is in a bookmarklet
 * {isinbrowser:true,id:"<versionname>"} to set a version if the app is in loaded in the browser
 * {isonline:true,id:"<versionname>"} to set a version if the device is online
 * {isoffline:true,id:"<versionname>"} to set a version if the device is offline
 * {id:"<versionname>"} to set a version without condition (usually for fallback version)
 *
 * You can combine all the conditions together - will be evaluated in AND, so:
 *
 * {sizemorethan:{width:320,height:200},islandscape:true,id:"<versionname>"}
 *
 * Will apply the <versionname> version of the magazine if the screen resolution is greater than 320x200 AND the display is in landscape.
 *
 */
browse._magazine.version=[
	// default version for: size >= iPad, in Safari
	{islandscape:true,sizemorethan:{width:1,height:1},id:"landscapedefaultversion"},
	{isportrait:true,sizemorethan:{width:1,height:1},id:"portraitdefaultversion"},
	 // mini version for: size >= iPhone, in fullscreen
	//{islandscape:true,sizemorethan:{width:0,height:0},id:"defaultversion"},
	//{isportrait:true,sizemorethan:{width:0,height:0},id:"defaultversion"},
	// bookmarklet instructions for: device is iphone or ipod
	//{isiphone:true,id:"bookmarklet"},
	//{isipod:true,id:"bookmarklet"},
	// Unavailable for others
	{id:"unavailable"} 
];

/*
 * Your pages templates. Can be stacked one over another one when creating the page.
 * Usually are HTML files.
 */
browse._magazine.templates={
	/*cover:{file:"issues/common/templates/cover.html"},
	
	defaultheader:{file:"issues/common/templates/default-header.html"},
	defaultmiddle:{file:"issues/common/templates/default-middle.html"},
	defaultfooter:{file:"issues/common/templates/default-footer.html"},
	defaultsolo:{file:"issues/common/templates/default-solo.html"},
	
	articletopfull:{file:"issues/common/templates/article-top-full.html"},
	articletopbottom:{file:"issues/common/templates/article-top-bottom.html"},
	articletopright:{file:"issues/common/templates/article-top-right.html"},
	articletopleft:{file:"issues/common/templates/article-top-left.html"},
	articletophub:{file:"issues/common/templates/article-top-hub.html"},

	articletoprightlong:{file:"issues/common/templates/article-top-right-long.html"},
	articlebottomfullfollow:{file:"issues/common/templates/article-bottom-full-follow.html"},
	
	articlebottomtextonly:{file:"issues/common/templates/article-bottom-textonly.html"},
	articlebottomleft:{file:"issues/common/templates/article-bottom-left.html"},
	articlebottomleft2:{file:"issues/common/templates/article-bottom-left2.html"},
	articlebottomhub:{file:"issues/common/templates/article-bottom-hub.html"},
	
	articlesololeft:{file:"issues/common/templates/article-solo-left.html"},
	articlesoloright:{file:"issues/common/templates/article-solo-right.html"},

	articlescrollmerge:{file:"issues/common/templates/article-scroll-merge.html"},
	articlescrollsimplemerge:{file:"issues/common/templates/article-scroll-simplemerge.html"},
	
	articletopsplit:{file:"issues/common/templates/article-top-split.html"},

	boxtopleft:{file:"issues/common/templates/box-top-left.html"},

	widgetthankyoubullet:{keeponrasterized:true,file:"issues/common/templates/widget-thankyou-bullet.html"},
	widgettop6scrolly:{keeponrasterized:true,file:"issues/common/templates/widget-top-6scrolly.html"},
	widgetleft6scrolly:{keeponrasterized:true,file:"issues/common/templates/widget-left-6scrolly.html"},
	widgetrightfiches:{keeponrasterized:true,file:"issues/common/templates/widget-right-fiches.html"},
	widgetrightface:{keeponrasterized:true,file:"issues/common/templates/widget-right-face.html"},
	widgetrightcomplex:{keeponrasterized:true,file:"issues/common/templates/widget-right-complex.html"},
	widgetrightyoutube:{keeponrasterized:true,file:"issues/common/templates/widget-right-youtube.html"},
	widgetboards:{keeponrasterized:true,file:"issues/common/templates/widget-top-boards.html"},
	widgettime:{keeponrasterized:true,file:"issues/common/templates/widget-right-time.html"},
	widgettopindex:{keeponrasterized:true,file:"issues/common/templates/widget-top-index.html"},
	widgetbottomgeo:{keeponrasterized:true,file:"issues/common/templates/widget-bottom-geo.html"},
	widgetrightlost:{keeponrasterized:true,file:"issues/common/templates/widget-right-lost.html"},
	widgetrightphotos:{keeponrasterized:true,file:"issues/common/templates/widget-right-photos.html"},
	mydefaulttemp:{keeponrasterized:true,file:"issues/common/templates/my-default-temp.html"},
	widgetrightfichescss:{keeponrasterized:true,file:"issues/common/templates/widget-right-fiches-css.html"},
	
	/*
	 * MINI VERSIONS
	 
	minicover:{file:"issues/common/templates/mini/cover.html"},
	minisolo:{file:"issues/common/templates/mini/default-solo.html"},
	miniarticlefulltop:{file:"issues/common/templates/mini/article-full-top.html"},
	miniwidgetthankyoubullet:{file:"issues/common/templates/mini/widget-thankyou-bullet.html"}*/

};

/*
 * Magazine content.
 * Is divided in "versions", that are decided using the browse._magazine.version queue.
 */
browse._magazine.versions=b1call();

/*
 * The magazine data. Are the single pages that are used when creating the magazine versions.
 * Each page can have different structure and composition.
 */
browse._magazine.data= bcall();
