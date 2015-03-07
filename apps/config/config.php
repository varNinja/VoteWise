<?php
// Load application configurations
$application = include_once CONFIG_DIR . '/application.php';

$config = array(
    'application' => $application['application'],
    'mail' => $application['mail'],
    'admin_language' => 'en', // en. All translations contains in /app/modules/Cms/admin_translations
    'loader' => array(
        'namespaces' => array(
             APPNAME . '\\' . 'Application' => MODULES_DIR . '/application',
             APPNAME . '\\' . 'Elements' => APPS_DIR . '/library',
            // Setup vendors namespaces
        ),
    ),
    'modules' => array(
    ),
);

// get list of modules
require_once CONFIG_DIR . '/modules.php';
$modules_list = getModulesList();

// merge config from each module
require_once MODULES_DIR . '/application/config.php';
$cfgModules = new \Application\Config\ConfigModules();
$modules_config = $cfgModules->configModules($modules_list);
$config = array_merge_recursive($config, $modules_config);


// merge loaders from each module
require_once MODULES_DIR . '/application/loader.php';
$ldrModules = new \Application\Loader\Modules();
$modules_loader = $ldrModules->modulesConfig($modules_list);
$config = array_merge_recursive($config, $modules_loader);

return new \Phalcon\Config($config);
