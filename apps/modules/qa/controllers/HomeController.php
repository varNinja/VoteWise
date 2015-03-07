<?php

namespace VoteWise\QA\Controllers;

use Phalcon\Tag as Tag;

class HomeController extends ControllerBase {
   public function initialize() {
      $this->view->setTemplateAfter('main');
      Tag::setTitle('Home');
      parent::initialize();
   }

   public function indexAction() {
   }
}
