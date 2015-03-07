<?php

return array(
    'application' => array(
        'registerDirs' => array(
            'libraryDir'     => APPS_DIR . '/library/',
            'migrationsDir'  => APPS_DIR . '/migrations/',
            'pluginsDir'     => APPS_DIR . '/plugins/',
            'vendorsDir'     => APPS_DIR . '/vendors/',
        ),
        'cacheDir'       => BASE_DIR . '/cache/',
        'cryptSalt'      => 'eEAfR|_&G&f,+vU]:jFr!!A&+71w1Ms9~8_4L!<@[N@DyaIP_2My|:+.u>/6m,$D',
        'publicUrl'      => 'votewise.net',
        'baseUri'        => '/votewise/',
    ),
    'mail' => array(
        'fromName' => '',
        'fromEmail' => 'votewise.net',
        'smtp' => array(
            'server' => 'smtp.votewise.net',
            'port' => 587,
            'security' => 'tls',
            'username' => '',
            'password' => '',
        )
    ),
);
