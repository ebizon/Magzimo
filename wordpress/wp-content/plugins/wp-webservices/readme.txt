=== Plugin Name ===
Contributors: Prasath Nadarajah
Donate link: http://nprasath.com
Tags: webservices, xmlrpc, Remote API
Requires at least: 2.9
Tested up to: 3.2
Stable tag: 1.0

== Description ==
This plugin extends the basic webservices exposed by WordPress.
The new features includes
<ul>
    <li>User management.</li>
    <li>Custom post type management.</li>
    <li>Custom taxonomy management.</li>
    <li>Setting management</li>
</ul>

The new methods includes
<ul>
    <li>wp.newUser - allows to create a new user</li>
    <li>wp.editUser - edit user information</li>
    <li>wp.deleteUser - delete a specfic user</li>
    <li>wp.getUser - get information about a specific user</li>
    <li>wp.getUsers - retrieve a list of users</li>
    <li>wp.newPost  - create a new post in any post type</li>
    <li>wp.editPost  - edit any post type</li>
    <li>wp.deletePost - delete a specific post</li>
    <li>wp.getPost  - get any post from any post type</li>
    <li>wp.getPosts  - get a list of posts in the blog</li>
    <li>wp.getPostType - get information about a specific post type</li>
    <li>wp.getPostTypes - get a list of registered taxonomies</li>
    <li>wp.getPostTerms - get terms associated with a post</li>
    <li>wp.setPostTerms - set terms associated with a post</li>
    <li>wp.getTaxonomy - get information about a specific taxonomy</li>
    <li>wp.getTaxonomies  - get a list of registered taxonomies</li>
    <li>wp.newTerm  - create a new term in a taxonomy</li>
    <li>wp.editTerm  - edit a term in a taxonomy</li>
    <li>wp.deleteTerm  - delete a term in a taxonomy</li>
    <li>wp.getTerm  - get information about a specific term in a taxonomy</li>
    <li>wp.getTerms - get a list of term associated with a taxonomy</li>
    <li>wp.getSettings - get blog settings</li>
    <li>wp.updateSettings - update blog settings</li>
</ul>