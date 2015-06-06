<?php

class TidyPlugin
{

    public function afterRender($event, $view)
    {

        $tidyConfig = array(
            'clean'          => true,
            'output-xhtml'   => true,
            'show-body-only' => true,
            'wrap'           => 0,
        );

        $tidy = tidy_parse_string($view->getContent(), $tidyConfig, 'UTF8');
        $tidy->cleanRepair();

        $view->setContent((string) $tidy);
    }

}

//Attach the plugin as a listener
$eventsManager->attach("view:afterRender", new TidyPlugin());