<?php
namespace VoteWise\QA\Controllers;

use Phalcon\Tag as Tag;
 
use Phalcon\Mvc\Model\Criteria;
use Phalcon\Paginator\Adapter\Model as Paginator;

class TopicController extends ControllerBase
{

    /**
     * Index action
     */
    public function indexAction()
    {
        $this->persistent->parameters = null;
    }

    /**
     * Searches for topic 
     */
    public function searchAction()
    {

        $numberPage = 1;
        if ($this->request->isPost()) {
            $query = Criteria::fromInput($this->di, "Topic", $_POST);
            $this->persistent->parameters = $query->getParams();
        } else {
            $numberPage = $this->request->getQuery("page", "int");
        }

        $parameters = $this->persistent->parameters;
        if (!is_array($parameters)) {
            $parameters = array();
        }
        $parameters["order"] = "topicid";

        $topic = Topic::find($parameters);
        if (count($topic) == 0) {
            $this->flash->notice("The search did not find any topic ");

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "index"
            ));
        }

        $paginator = new Paginator(array(
            "data" => $topic,
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
     * Edits a topic
     *
     * @param string $id
     */
    public function editAction($topicid)
    {

        if (!$this->request->isPost()) {

            $topic = Topic::findFirstByid($topicid);
            if (!$topic) {
                $this->flash->error(" was not found");

                return $this->dispatcher->forward(array(
                    "controller" => "topic",
                    "action" => "index"
                ));
            }

            $this->view->id = $topic->topicid;

            $this->tag->setDefault("id", $topic->getid());
            $this->tag->setDefault("desc", $topic->getDesc());
            $this->tag->setDefault("stop", $topic->getStop());
            $this->tag->setDefault("order", $topic->getOrder());
            $this->tag->setDefault("crdt", $topic->getCrdt());
            $this->tag->setDefault("crdtid", $topic->getCrdtid());
            $this->tag->setDefault("updt", $topic->getUpdt());
            $this->tag->setDefault("updtid", $topic->getUpdtid());
            $this->tag->setDefault("delmark", $topic->getDelmark());
            
        }
    }

    /**
     * Creates a new topic
     */
    public function createAction()
    {

        if (!$this->request->isPost()) {
            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "index"
            ));
        }

        $topic = new Topic();

        $topic->setid($this->request->getPost("id"));
        $topic->setDesc($this->request->getPost("desc"));
        $topic->setStop($this->request->getPost("stop"));
        $topic->setOrder($this->request->getPost("order"));
        $topic->setCrdt($this->request->getPost("crdt"));
        $topic->setCrdtid($this->request->getPost("crdtid"));
        $topic->setUpdt($this->request->getPost("updt"));
        $topic->setUpdtid($this->request->getPost("updtid"));
        $topic->setDelmark($this->request->getPost("delmark"));
        

        if (!$topic->save()) {
            foreach ($topic->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "new"
            ));
        }

        $this->flash->success(" was created successfully");

        return $this->dispatcher->forward(array(
            "controller" => "topic",
            "action" => "index"
        ));

    }

    /**
     * Saves an edited topic
     *
     */
    public function saveAction()
    {

        if (!$this->request->isPost()) {
            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "index"
            ));
        }

        $topicid = $this->request->getPost("topicid");

        $topic = Topic::findFirstByid($topicid);
        if (!$topic) {
            $this->flash->error("Topic does not exist " . $id);

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "index"
            ));
        }

        $topic->setid($this->request->getPost("id"));
        $topic->setDesc($this->request->getPost("desc"));
        $topic->setStop($this->request->getPost("stop"));
        $topic->setOrder($this->request->getPost("order"));
        $topic->setCrdt($this->request->getPost("crdt"));
        $topic->setCrdtid($this->request->getPost("crdtid"));
        $topic->setUpdt($this->request->getPost("updt"));
        $topic->setUpdtid($this->request->getPost("updtid"));
        $topic->setDelmark($this->request->getPost("delmark"));
        

        if (!$topic->save()) {

            foreach ($topic->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "edit",
                "params" => array($topic->topicid)
            ));
        }

        $this->flash->success("Topic was updated successfully");

        return $this->dispatcher->forward(array(
            "controller" => "topic",
            "action" => "index"
        ));

    }

    /**
     * Deletes a topic
     *
     * @param string $topicid
     */
    public function deleteAction($topicid)
    {

        $topic = Topic::findFirstBytopicid($topicid);
        if (!$topic) {
            $this->flash->error("topic was not found");

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "index"
            ));
        }

        if (!$topic->delete()) {

            foreach ($topic->getMessages() as $message) {
                $this->flash->error($message);
            }

            return $this->dispatcher->forward(array(
                "controller" => "topic",
                "action" => "search"
            ));
        }

        $this->flash->success("topic was deleted successfully");

        return $this->dispatcher->forward(array(
            "controller" => "topic",
            "action" => "index"
        ));
    }

}
