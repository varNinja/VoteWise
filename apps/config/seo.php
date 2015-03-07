<?php
/**
 * @param $module
 */
function getSeo($moduleName) {
  $seo_formats = array(
    // module =>
    'vw' => array(
      // controller =>
      'home' => array(
        'caption' => 'Home',
        'url' => 'home',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
        ),
      ),
      'donate' => array(
        'caption' => 'Donate',
        'url' => 'donate',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'donate' => array(
        'caption' => 'Donate',
        'url' => 'donate',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'profile' => array(
        'caption' => 'Profile',
        'url' => 'profile',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'express' => array(
        'caption' => 'Express Yourself',
        'url' => 'express-yourself',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'learn' => array(
        'caption' => 'Learn',
        'url' => 'learn',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'discuss' => array(
        'caption' => 'Discuss',
        'url' => 'discussions',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'help' => array(
        'caption' => 'Help',
        'url' => 'help',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'contact' => array(
        'caption' => 'Contact',
        'url' => 'contact-us',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
    ),
    'qa' => array(
      'home' => array(
        'caption' => 'Home',
        'url' => 'home',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'question' => array(
        'caption' => 'Question',
        'url' => 'questions',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'issue' => array(
        'caption' => 'Issue',
        'url' => 'issues',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
      'answer' => array(
        'caption' => 'Answer',
        'url' => 'answers',
        'action' => 'index',
        'id' => '',
        'class' => '',
        'liLink' => array (
            'lclass' => '',
            'iclass' => '',
            'sclass' => '',
            'useCaptionInSpan' => false,
            'data'   => array(
                'toggle'    => ''
            ),
        ),
        'submenu' => array(
          '' => array(
            'caption' => '',
            'url' => '',
            'action' => '',
            'id' => '',
            'class' => '',
            'liLink' => array (
                'lclass' => '',
                'iclass' => '',
                'sclass' => '',
                'useCaptionInSpan' => false,
            ),
            'any' => true,
          ),
        ),
      ),
    ),      
  );

    foreach ($seo_formats as $module=>$controllers) {
        if ($module == lcfirst($moduleName)) {
            return $controllers;
        }
    }
    return (array());
}

/**
 * @param $controllers
 * @param $nameIndex
 * @param $retType
 * @return mixed
 */
function getController ($controllers, $nameIndex, $retType) {
    // Find the controller based on the index requested
    $x = 0;
    foreach ($controllers as $controller=>$options) {
        if (is_string($nameIndex) && $controller == $nameIndex) {
            break;
        } else if (is_numeric($nameIndex) && $x == $nameIndex) {
            break;
        }
        $x++;
    }

    switch ($retType) {
        case CONTROLLER:
            $ret = $controller;
            break;
        case INDEX:
            $ret = $x;
            break;
        case OPTIONS:
            $ret = $options;
            break;
        case URL_LINK:
            $ret = $options['url'];
            break;
        default:
            $ret = "";
    }
    return ($ret);
}
