<?php
// public/index.php

if (!defined('ROOT')) {
    define('ROOT', dirname(__DIR__));
}

require_once ROOT.'/apps/config/defines.php';

error_reporting(E_ALL);


class Application extends \Phalcon\Mvc\Application
{
    private static $mode    = 'dev';
    private static $modules;

    /**
     * Define some useful constants
     */

    const DEFAULT_MODULE    = 'vw';

    const MODE_PRODUCTION   = 'prod';
    const MODE_STAGING      = 'staging';
    const MODE_TEST         = 'test';
    const MODE_DEVELOPMENT  = 'dev';

    /**
     * Set application mode and error reporting level.
     */
    public function __construct()
    {
        if (!defined('PHALCON_MODE')) {
            $mode = getenv('PHALCON_MODE');
            $mode = $mode ? $mode : self::$mode;
            define('PHALCON_MODE', $mode);
        }

        switch (self::getMode()) {
            case self::MODE_PRODUCTION:
            case self::MODE_STAGING:
                error_reporting(0);
                break;

            case self::MODE_TEST:
            case self::MODE_DEVELOPMENT:
                error_reporting(E_ALL);
                break;
        }
    }

    protected function _registerModules()
    {
        /**
         * Register the installed modules
         */
        require_once CONFIG_DIR . '/modules.php';
        $rModules = getModulesRegistry();
        $this->registerModules($rModules);
    }

    /**
     * Register the services here to make them general or register in
     * the ModuleDefinition to make them module-specific.
     */
    protected function _registerServices()
    {

        /**
         * Read services
         */
        include CONFIG_DIR . "/services.php";
    }

    public function main()
    {
        try {
            $this->_registerServices();
            $this->_registerModules();
            
            echo $this->handle()->getContent();

        } catch (Exception $e) {

            /*$logger = new \Phalcon\Logger\Adapter\File(__DIR__ . '/../logs/'.date('Y-m-d').'.log');
            $logger->log($e->getMessage(), \Phalcon\Logger::ERROR);

            // remove view contents from buffer
            ob_clean();

            $errorCode = 500;
            $errorView = 'errors/500.html';

            switch (true) {
                // 401 UNAUTHORIZED
                case $e->getCode() == 401:
                    $errorCode = 401;
                    $errorView = 'errors/401.html';
                    break;

                    // 403 FORBIDDEN
                case $e->getCode() == 403:
                    $errorCode = 403;
                    $errorView = 'errors/403.html';
                    break;

                    // 404 NOT FOUND
                case $e->getCode() == 404:
                case ($e instanceof Phalcon\Mvc\View\Exception):
                case ($e instanceof Phalcon\Mvc\Dispatcher\Exception):
                    $errorCode = 404;
                    $errorView = 'errors/404.html';
                    break;
            }

            // Get error view contents. Since we are including the view
            // file here you can use PHP and local vars inside the error view.
            ob_start();
            include_once $errorView;
            $contents = ob_get_contents();
            ob_end_clean();

            // send view to header
            $response = $this->getDI()->getShared('response');
            $response->resetHeaders()
                ->setStatusCode($errorCode, null)
                ->setContent($contents)
                ->send();
            */
            echo $e->getMessage();
        }
    }

    public static function getMode()
    {
        return self::$mode;
    }
}

try {
    // Run application:
    $application = new Application();
    $application->main();
}
catch(Phalcon\Exception $e) {
    echo $e->getMessage(), '<br>';
    echo nl2br(htmlentities($e->getTraceAsString()));
} catch (PDOException $e){
    echo $e->getMessage(), '<br>';
    echo nl2br(htmlentities($e->getTraceAsString()));
}
