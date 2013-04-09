=== Post Sorter ===
Contributors: rolice
Donate link: http://rolice.intellisys.info/en-US
Tags: sort, sorting
Requires at least: 3.2
Tested up to: 3.4
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

WordPress plugin for easily sorting of posts or pages by numeric factor.  

== Description ==

Plugin for easy sorting of posts or pages (both called *posts* below) by user-selected integer numeric factor. The plugin allows easily to switch direction or to 
enable/disable it. After activation you will be able to manage post position in a loop directly by the new column - Sort or when adding/editing post to fulfill the 
desired number in the new metabox, that will appear for you - *Post Sorter*.

There are two arrows in the admin post list, which could be used for fast switching of posts positions, i.e. if you click up it will set post order *numeric factor* with 1 
more or less (depending on sorting direction) than the one above.

In the options page of the plugin you will see several basic settings, whether to enable it and the sorting direction - ascending or descending.
If the plugin is enabled it will sort the posts on the front end for you by the numeric values you have previously entered, in the direction selected on the plugin options.

Keep in mind that you could pick any number you like, so if you left some **free range** between posts you could manage to achieve an order that would satisfy your needs even 
in more than one view of post lists (loops) - for example: *Post1* => 10, *Post2* => 20, *Post3* => 30, etc. This way also, when you need to insert post between **Post1** and 
**Post2** you could set the new one with any numeric factor value between 11 and 19.

There is also another option to separate a group of posts, but to maintain their default sorting within the group - simply give the group same numeric factor for sorting, 
example:

**Post 1** => 10
**Post 2** => 20
**Post 3** => 20
**Post 4** => 30

Depending on the sorting direction the first and the last post will be **Post 1** or **Post 4** and in the middle we will have both, **Post 2** and **Post 3** sorted by date 
of creation (by default). Then if **Post 3** is newer than **Post 2** it will be up in both cases of sorting direction.

== Installation ==

1. Upload the extracted `post_sorter` folder to the `/wp-content/plugins/` directory (for manual setup)
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Configure it from the newly appeared `Post Sorter` administration menu
1. Enjoy using it :)

== Frequently Asked Questions ==

= How it actually works? =

The plugin would replace the default sorting of posts (by newest to oldest) to numeric value sorting - *numeric factor*. It also allows its user to select the direction,
from lesser numeric value to greater or oppositve.

= Do I have to make code changes or to insert code in the template? =

No. It will be done automatically for your by the plugin.

== Screenshots ==

1. View of the plugin options page in the admin. See the newly added menu on the bottom left, in the navigator.
1. View of post list in the administration. We have a new column for easy sorting.
1. The screen of post edition - you could see the **metabox added with caption *Post Sorter***.

== Changelog ==

= 1.0 =
* Brought it to the world.

== Upgrade Notice ==

= 1.0 =
Basic functionality delivered in this package.

== Arbitrary section ==

We are open for any ideas that would improve the plugin.