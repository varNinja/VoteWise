<?php

namespace Application\Config;

use Phalcon\Text;

class ConfigModules
{

    public function configModules($modules_list)
    {
        $namespaces = array();
        $modules = array();

        if (!empty($modules_list)) {
            foreach ($modules_list as $module) {
                $cfgFile = MODULES_DIR . '/' . $module . '/config/config.php';
                if (file($cfgFile))
                    $modules_array[$module] = include_once $cfgFile;
            }
        }
        return $modules_array;
    }

} 