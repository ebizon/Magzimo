=== Plugin Name ===
Contributors: Golawala, Mustansir
Tags: taxonomy, custom taxonomy, taxonomies, categories, category, tags, tag, admin, management, manage
Requires at least: 2.8.1
Tested up to: 3.0.4
Stable tag: 2.0.0.2

The WP Category Manager plugin makes it easier to manage any taxonomy that is used to control the posts within widgets in the presentation layer

== Description ==

This plugin allows you to add a dashboard widget that manages specific taxonomies (Such as tags and categories or any custom taxonomy). Specifically the dashboard widget makes it easy to remove a post from a taxonomy of any kind.

Those who have themes, plugins, widgets that use the wordpress taxonomy system to place posts in various lists will find this plugin especially useful.

This plugin allows you to add a dashboard widget that manages taxonomies. It easy to remove a taxonomy term applied to a post.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the `wp-category-manager` directory into the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Profit!

== Frequently Asked Questions ==

= Have questions/comments? =

Ask me!


== Screenshots ==

1. The Category manager module on the dashboard

== Changelog ==

= 2.0.0.2 =
* Checks for compatible version of PHP before allowing plugin to be activated.
* Better cleanup on plugin deactivation. (Also means loss of settings on deactivation)

= 2.0.0.1 =
* Minor Patch to stop loading of JS & CSS files outside the Admin section

= 2.0.0.0 =
* Major rewiring of the plugin to allow it to manage any taxonomy (tags, categories, links, etc.) built in or custom. It is no longer limited to just categories

= 1.3.2.0 =
* The plugin will only let users with the edit_post privilege remove categories from posts

= 1.3.1.0 =
* Defensive programming / Fortified code against SQL Injection attacks.
* Added loader animation for widget when waiting for AJAX calls to complete
* Fixed annoying flicker where the post count was visible for a fraction of a second on browsers with slow JS engines.

= 1.3.0.0 =
* Optional Pagination support for large category lists
* Total Post counts added for the category being managed
* Categories in the drop down are sorted alphabetically to make them easier to find

= 1.2.0.1 =
* Fixed a bug where category updates, returned an error to the user in certain configurations

= 1.2 =
* A few minor bug fixes

= 1.1 =
* Added option to add a drop down to the dashboard widget for quick category switching
* Code cleanup and refactoring for future planned improvements
* A few minor bug fixes

= 1.0 =
* Release to public. Settings page to control the category being managed, Category management module on the dashboard
