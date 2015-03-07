<?php

namespace Application\Loader;

use Phalcon\Text;

class Modules
{

    public function modulesConfig($modules_list)
    {
        $namespaces = array();
        $modules = array();

        if (!empty($modules_list)) {
            foreach ($modules_list as $module) {
                $namespaces[APPNAME . '\\' . ucfirst($module) . '\\' . 'Module'] = MODULES_DIR .'/' . $module .'/';
                $simple = Text::uncamelize($module);
                $simple = str_replace('_', '-', $simple);
                $modules[$simple] = array(
                    'className' => APPNAME . '\\' . ucfirst($module) . '\\Module',
                    'path' => MODULES_DIR .'/' . $module . '/module.php'
                );
            }
        }
        $modules_array = array(
            'loader' => array(
                'namespaces' => $namespaces,
            ),
            'modules' => $modules,
        );
        return $modules_array;
    }
} 