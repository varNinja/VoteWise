<?php

namespace VoteWise\VW;

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Mvc\ModuleDefinitionInterface;


class Module implements ModuleDefinitionInterface
{

    /**
     * Registers the module auto-loader
     */
    public function registerAutoloaders()
    {
        /**
         * Read auto-loader from loader.php
         */
        include VW_DIR . "/config/loader.php";
    }

    /**
     * Registers the module-only services
     *
     * @param Phalcon\DI $di
     */
    public function registerServices($di)
    {

        /**
         * Read configuration
         */
//        $config = include VW_DIR . "/config/config.php";
//        $di->set('config', $config);

        $di->set('dispatcher', function() {
            $dispatcher = new Dispatcher();
            $dispatcher->setDefaultNamespace("VoteWise\VW\Controllers");
            return $dispatcher;
        });

        /**
         * Setting up the view component
         */
        $config = $di->get('config');
        $di->set('view', function () use ($config) {
            $view = new View();
            $view->setViewsDir($config->vw->application->registerDirs->viewsDir);
            $view->registerEngines(array(
                '.volt' => function ($view, $di) use ($config) {

                    $volt = new VoltEngine($view, $di);
                    $volt->setOptions(array(
                        'compiledPath' => $config->application->cacheDir,
                        'compiledSeparator' => '_'
                    ));
                    return $volt;
                },
                '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
            ));

            return $view;
        }, true);

        /**
         * Database connection is created based in the parameters defined in the configuration file
         */
        $di->set('db', function() use ($config) {
            return new DbAdapter(array(
                "host" => $config->vw->database->host,
                "username" => $config->vw->database->username,
                "password" => $config->vw->database->password,
                "dbname" => $config->vw->database->name
            ));
        });
    }
}
