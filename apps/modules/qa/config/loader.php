<?php

use \Phalcon\Loader;

$eventsManager = new \Phalcon\Events\Manager();
$loader = new Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */

//$config = include QA_DIR . "/config/config.php";
$di = \Phalcon\DI::getDefault();
$config = $di->get('config');

// register core directories
$loader->registerDirs($config->application->registerDirs->toArray(), true);
$loader->registerNamespaces($config->loader->namespaces->toArray());

// register module directories
$loader->registerDirs($config->qa->application->registerDirs->toArray(),  true);

$loader->registerNamespaces(array(
    'VoteWise\QA\Controllers' => $config->qa->application->registerDirs->controllersDir,
    'VoteWise\QA\Forms'       => $config->qa->application->registerDirs->formsDir,
    'VoteWise\QA\Models'      => $config->qa->application->registerDirs->modelsDir,
  ),
  true
);

//Listen all the loader events
$eventsManager->attach('loader', function($event, $loader) {
    if ($event->getType() == 'beforeCheckPath') {
//        echo "qa: ", $loader->getCheckedPath(), "<br />";
    }
});

$loader->setEventsManager($eventsManager);

$loader->register();
