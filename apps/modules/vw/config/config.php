<?php

return array(
    'database' => array(
        'adapter'  => 'Mysql',
        'host'     => 'localhost',
        'username' => 'strimble',
        'password' => 'yrsL4$',
        'dbname'   => 'votewise_vw',
    ),
    'application' => array(
        'registerDirs' => array(
            'controllersDir' => VW_DIR . '/controllers/',
            'viewsDir'       => VW_DIR . '/views/',
            'formsDir'       => VW_DIR . '/forms/',
            'modelsDir'      => VW_DIR . '/models/',
        ),
    ),
);
