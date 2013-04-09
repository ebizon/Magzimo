<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'digital_magazine');

/** MySQL database username */
define('DB_USER', 'digital');

/** MySQL database password */
define('DB_PASSWORD', '432qwe');

/** MySQL hostname */
define('DB_HOST', '192.168.1.75');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'a>%p~n{8<Go=~K9Kx.By$?xx#Bh@G%;Os*xe@#/zh6`>eov/X]Pys3.xtd4<YoU+');
define('SECURE_AUTH_KEY',  '^D[/JkJapD#}CKJfD24[y]|$;1gMH~pOA#++)M^k:|E0yY.<~p&VO}n-x =|elvK');
define('LOGGED_IN_KEY',    'OSmx{gwcvc>OjyzOpe(r=N!$=wrNx0]|P;I~Xu0M#hFhf%Pqj+XuJP<2HG+#?)W6');
define('NONCE_KEY',        '54!L#t$^DSZfWQk=Zg)$DRw8cbs&BD&s#0(FZ@yCy!BUmP_%;|L&8&Xbo(7xdR1m');
define('AUTH_SALT',        '.e&/#&sbNBjCXW} 2bVHv|P-:aG.|Ne|A~GYz]V?Rn^vb `K*YaspdSxe+]|HnrV');
define('SECURE_AUTH_SALT', 'C=*NIl_$:klNL8]_p+EQ$>H>8B ]&&/B.%k7{?qPwp3a32jJ*D/A}gId^~?Q_u7Y');
define('LOGGED_IN_SALT',   'LiN|:v&)D_W+!~7v;]{>&MjBSPS`FU:6exs6R8YuE~MG`JTu&JT{CFT=Swd!lGI-');
define('NONCE_SALT',       '-U%iB$WDJ_-(uFlO&>-?|q9tDgTn`[+a<m7@^D<DJfi_Otol..)f7|?|yW=6|pS2');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
