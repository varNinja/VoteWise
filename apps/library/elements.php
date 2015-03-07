<?php
//namespace LVGBC\Elements;

use Phalcon\Mvc\User\Component;
use Phalcon\Tag as Tag;

include_once CONFIG_DIR . "/seo.php";

/**
 * Elements
 *
 * Helps to build UI elements for the application
 */
class Elements extends Component
{
    private static $seoFormat;

    private function getDataOptions($liLink=array()) {
        $dataOptions = ' ';
        if (isset($liLink['data']) && count($liLink['data'])>0) {
            foreach ($liLink['data'] as $data => $dataOption) {
                $dataOptions .= 'data-'. $data . '="' . $dataOption . '" ';
            }
        }                
        return ($dataOptions);
    }

    private function createATagLink($liLink=array(), $caption='') {
        // The link is used for both top menu only or for top menu containing submenus
        $iLink = '';
        $sLink = '';
        $lLink = '';

        // set up classes for the a link
        if (isset($liLink['iclass']) && strlen($liLink['iclass'])>0) {
            $iLink = '<i class="'.$liLink['iclass'].'"></i>';
        }

        // use sclass with or without caption
        if (isset($liLink['sclass']) && strlen($liLink['sclass'])>0) {
            $sLink = '<span class="'.$liLink['sclass'].'">'.($liLink['useCaptionInSpan'] ? $caption : '') .'</span>';
        }

        if (isset($liLink['lclass']) && strlen($liLink['lclass'])>0) {
            $lLink = '<div class="'.$liLink['lclass'].'"'.
//                $this->getDataOptions($liLink).
                '>'.
                $iLink . ($liLink['useCaptionInSpan'] ? '' : $caption).$sLink.'</div>';
        } else {
            $lLink = $caption;
        }

        return ($lLink);
    }

    /**
     * Builds header menu with left and right items
     *
     * @return string
     */
    public function getMenu() {
        // if logged in, output logout
        $auth = $this->session->get('auth');
        if ($auth) {
        } else {
        }

        $moduleName = $this->router->getModuleName();
        $controllerName = $this->view->getControllerName();
        $subcontrollerName = $this->view->getActionName();
        self::$seoFormat = getSeo($moduleName);


        // Output menu items
        echo '<ul class="navbar-nav">';
        foreach (self::$seoFormat as $controller => $option) {
            $active = ' ';
            $dataOptions = $this->getDataOptions($option['liLink']);
            $link = $this->createATagLink($option['liLink'], $option['caption']);

            // Output li for menu
            if ($controllerName == $controller) {
                $active = ' active';
            }
            echo '<li class="' . $option['class'] . $active . '">';

            // Output any submenu
            if (isset($option['submenu'])) {
//                echo Tag::linkTo($option['url'], $link);
                echo '<a href="'.$option['url'].'" '.$dataOptions.'>'.$link.'</a>';
                echo '<ul class="navbar-subnav dropdown-menu">';
                foreach ($option['submenu'] as $subcontroller => $subOption) {
                    $active = ' ';
//                    $subdataOptions = $this->getDataOptions($subOption['liLink']);
                    $sublink = $this->createATagLink($subOption['liLink'], $subOption['caption']);

                    if ($subcontrollerName == $subcontroller) {
                        $active = ' active';
                    }
                    echo '<li class="'.$subOption['class'] . $active . '">';

                    echo Tag::linkTo($option['url'].'/'.$subOption['url'], $sublink);
                    echo '</li>';
                }
                echo '</ul>';
            } else {
                echo Tag::linkTo($option['url'], $link);         // use the option link, not the suboption link
            }
           echo '</li>';
        }
        // display closing x
//      echo '<li class="ml1 navbar-close">';
//      echo '  <span class="glyphicon glyphicon-remove"></span>';
//      echo '</li>';
        echo '</ul>';
    }


}
