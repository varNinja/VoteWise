<?php
namespace VoteWise\QA\Controllers;

use Phalcon\Tag as Tag;

use Phalcon\Mvc\Model\Criteria;
use Phalcon\Paginator\Adapter\Model as Paginator;

class IssueController extends ControllerBase
{

    /**
     * Index action
     */
    public function indexAction()
    {
        $this->persistent->parameters = null;
    }

    /**
     * Searches for issue
     */
    public function searchAction()
    {

        $numberPage = 1;
        if ($this->request->isPost()) {
            $query = Criteria::fromInput($this->di, "Issu", $_POST);
            $this->persistent->parameters = $query->getParams();
        } else {
            $numberPage = $this->request->getQuery("page", "int");
        }

        $parameters = $this->persistent->parameters;
        if (!is_array($parameters)) {
            $parameters = array();
        }
        $parameters["order"] = "issuid";

        $issu = Issue::find($parameters);
        if (count($issu) == 0) {
            $this->flash->notice("The search did not find any issue");

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "index"
            ));
        }

        $paginator = new Paginator(array(
            "data" => $issu,
            "limit"=> 10,
            "page" => $numberPage
        ));

        $this->view->page = $paginator->getPaginate();
    }

    /**
     * Displayes the creation form
     */
    public function newAction()
    {

    }

    /**
     * Edits a issue
     *
     * @param string $issuid
     */
    public function editAction($issuid)
    {

        if (!$this->request->isPost()) {

            $issu = Issue::findFirstByIssuId($issuid);
            if (!$issu) {
                $this->flash->error("issue was not found");

                return $this->dispatcher->forward(array(
                    "controller" => "issue",
                    "action" => "index"
                ));
            }

            $this->view->issuid = $issu->issuid;

            $this->tag->setDefault("issuid", $issu->getIssuId());
            $this->tag->setDefault("desc", $issu->getDesc());
            $this->tag->setDefault("order", $issu->getOrder());
            $this->tag->setDefault("crdt", $issu->getCrdt());
            $this->tag->setDefault("crdtid", $issu->getCrdtId());
            $this->tag->setDefault("updt", $issu->getUpdt());
            $this->tag->setDefault("updtid", $issu->getUpdtId());
            $this->tag->setDefault("delmark", $issu->getDelmark());
            
        }
    }

    /**
     * Creates a new issu
     */
    public function createAction()
    {

        if (!$this->request->isPost()) {
            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "index"
            ));
        }

        $issu = new Issue();

        $issu->setIssuId($this->request->getPost("issuid"));
        $issu->setDesc($this->request->getPost("desc"));
        $issu->setOrder($this->request->getPost("order"));
        $issu->setCrdt($this->request->getPost("crdt"));
        $issu->setCrdtId($this->request->getPost("crdtid"));
        $issu->setUpdt($this->request->getPost("updt"));
        $issu->setUpdtId($this->request->getPost("updtid"));
        $issu->setDelmark($this->request->getPost("delmark"));
        

        if (!$issu->save()) {
            foreach ($issu->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "new"
            ));
        }

        $this->flash->success("issue was created successfully");

        return $this->dispatcher->forward(array(
            "controller" => "issue",
            "action" => "index"
        ));

    }

    /**
     * Saves a issue edited
     *
     */
    public function saveAction()
    {

        if (!$this->request->isPost()) {
            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "index"
            ));
        }

        $issuid = $this->request->getPost("issuid");

        $issu = Issue::findFirstByIssuId($issuid);
        if (!$issu) {
            $this->flash->error("issue does not exist " . $issuid);

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "index"
            ));
        }

        $issu->setIssuId($this->request->getPost("issuid"));
        $issu->setDesc($this->request->getPost("desc"));
        $issu->setOrder($this->request->getPost("order"));
        $issu->setCrdt($this->request->getPost("crdt"));
        $issu->setCrdtId($this->request->getPost("crdtid"));
        $issu->setUpdt($this->request->getPost("updt"));
        $issu->setUpdtId($this->request->getPost("updtid"));
        $issu->setDelmark($this->request->getPost("delmark"));
        

        if (!$issu->save()) {

            foreach ($issu->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "edit",
                "params" => array($issu->issuid)
            ));
        }

        $this->flash->success("issue was updated successfully");

        return $this->dispatcher->forward(array(
            "controller" => "issue",
            "action" => "index"
        ));

    }

    /**
     * Deletes a issue
     *
     * @param string $issuid
     */
    public function deleteAction($issuid)
    {

        $issu = Issue::findFirstByIssuId($issuid);
        if (!$issu) {
            $this->flash->error("issue was not found");

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "index"
            ));
        }

        if (!$issu->delete()) {

            foreach ($issu->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "issue",
                "action" => "search"
            ));
        }

        $this->flash->success("issue was deleted successfully");

        return $this->dispatcher->forward(array(
            "controller" => "issue",
            "action" => "index"
        ));
    }

}
