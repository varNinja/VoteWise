<?php
define('DEBUG', true);

if (!defined('APPNAME')) {
   define('APPNAME', 'VoteWise');
}

if (!defined('PUBLIC_PATH')) {
	define('PUBLIC_PATH', ROOT);
}

if (!defined('BASE_DIR')) {
    define('BASE_DIR', ROOT);
}

if (!defined('APPS_DIR')) {
   define('APPS_DIR', BASE_DIR.'/apps');
}

if (!defined('CONFIG_DIR')) {
   define('CONFIG_DIR', APPS_DIR.'/config');
}

if (!defined('MODULES_DIR')) {
   define('MODULES_DIR', APPS_DIR.'/modules');
}

if (!defined('VW_DIR')) {
   define('VW_DIR', MODULES_DIR.'/vw');
}

if (!defined('QA_DIR')) {
   define('QA_DIR', MODULES_DIR.'/qa');
}

if (!defined('APPLICATION_ENV')) {
	define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'development'));
}

if (!defined('APPLICATION_PATH')) {
	define('APPLICATION_PATH', (APPLICATION_ENV == 'development') ? APPS_DIR : APPS_DIR);
}

if (!defined('HOST_HASH')) {
	define('HOST_HASH', substr(md5($_SERVER['HTTP_HOST']), 0, 12));
}

if (!defined('CONTROLLER')) {
   define('CONTROLLER', 'C');
}

if (!defined('INDEX')) {
   define('INDEX', 'I');
}

if (!defined('OPTIONS')) {
   define('OPTIONS', 'O');
}

if (!defined('URL_LINK')) {
   define('URL_LINK', 'U');
}



