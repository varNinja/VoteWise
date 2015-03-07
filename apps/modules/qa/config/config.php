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
            'controllersDir' => QA_DIR . '/controllers/',
            'viewsDir'       => QA_DIR . '/views/',
            'formsDir'       => QA_DIR . '/forms/',
            'modelsDir'      => QA_DIR . '/models/',
        ),
    ),
);
