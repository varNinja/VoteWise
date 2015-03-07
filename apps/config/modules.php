<?php

// List of modules
function getModulesList() {
	return array(
	    'vw',
	    'qa',
	);
}

function getModulesRegistry() {
	return array(
	    'vw' => array(
        	'className' => 'VoteWise\VW\Module',
	        'path' => VW_DIR . '/module.php'
	    ),
	    'qa' => array(
	        'className' => 'VoteWise\QA\Module',
	        'path' => QA_DIR . '/module.php'
	    ),
	);
}
