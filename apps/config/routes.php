<?php
use Phalcon\Mvc\Router;
include_once CONFIG_DIR . "/seo.php";
/**
 * Registering a router
 */
$router = new Router();
$router->setDefaultModule($defaultModule);
$router->setDefaultNamespace("VoteWise\VW\Controllers");
$router->setDefaultController('home');
$router->setDefaultAction('index');
$router->removeExtraSlashes(true);

$router->add("/login", array(
  'controller' => 'session',
  'action' => 'index',
));

$controllers = getSeo($defaultModule);

// Load each router from the seo.php list
foreach ($controllers as $controller=>$option) {
    // Handle the controller
    $router->add('/'.$option['url'], array(
       'module' => $defaultModule,
       'controller' => $controller,
       'action'     => $option['action'],
    ));

   // Handle the route with subcontrollers
   if (isset($option['submenu'])) {
       foreach ($option['submenu'] as $subcontroller => $subOption) {
         $router->add('/'.$option['url'].'/'.$subOption['url'], array(
            'module' => $defaultModule,
            'controller' => $controller,
            'action'     => $subOption['action'],
         ));
       }
   }

}
return $router;

/*
foreach ($modules as $moduleName => $module) {

   // do not route default module
   if ($defaultModule == $moduleName) {
      continue;
   }

   $router->add('#^/'.$moduleName.'(|/)$#', array(
      'module' => $moduleName,
      'controller' => 'index',
      'action' => 'index',
   ));

   $router->add('#^/'.$moduleName.'/([a-zA-Z0-9\_]+)[/]{0,1}$#', array(
      'module' => $moduleName,
      'controller' => 1,
   ));

   $router->add('#^/'.$moduleName.'[/]{0,1}([a-zA-Z0-9\_]+)/([a-zA-Z0-9\_]+)(/.*)*$#', array(
      'module' => $moduleName,
      'controller' => 1,
      'action' => 2,
      'params' => 3,
   ));
}
*/
