<?php

use \Phalcon\Loader;

$eventsManager = new \Phalcon\Events\Manager();
$loader = new Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */

//$config = include VW_DIR . "/config/config.php";
$di = \Phalcon\DI::getDefault();
$config = $di->get('config');

// register core directories
$loader->registerDirs($config->application->registerDirs->toArray(), true);
$loader->registerNamespaces($config->loader->namespaces->toArray());

// register module directories
$loader->registerDirs($config->vw->application->registerDirs->toArray(),  true);

$loader->registerNamespaces(array(
    'VoteWise\VW\Controllers' => $config->vw->application->registerDirs->controllersDir,
    'VoteWise\VW\Forms'       => $config->vw->application->registerDirs->formsDir,
    'VoteWise\VW\Models'      => $config->vw->application->registerDirs->modelsDir,
  ),
  true
);

//Listen all the loader events
$eventsManager->attach('loader', function($event, $loader) {
    if ($event->getType() == 'beforeCheckPath') {
//        echo "vw: ", $loader->getCheckedPath(), "<br />";
    }
});

$loader->setEventsManager($eventsManager);

$loader->register();
