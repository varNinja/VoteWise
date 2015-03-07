<?php

use \Phalcon\Loader;

$loader = new Loader();
$eventsManager = new \Phalcon\Events\Manager();

/**
 * We're a registering a set of directories taken from the configuration file
 */

// registerDirs and registerNamespaces have been moved to module/loader.php
//$loader->registerDirs($config->application->registerDirs);
//$loader->registerNamespaces($config->loader->namespaces->toArray());

//Listen all the loader events
$eventsManager->attach('loader', function($event, $loader) {
    if ($event->getType() == 'beforeCheckPath') {
//        echo "app: ", $loader->getCheckedPath(), "<br />";
    }
});

$loader->setEventsManager($eventsManager);

$loader->register();

// Use composer autoloader to load vendor classes
require_once $config->application->registerDirs->vendorsDir . 'autoload.php';
