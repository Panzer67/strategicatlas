<?php

Class api4Controller Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "config3";        
        //$this->registry->template->show('header');
        $this->registry->template->show('map4');
        //$this->registry->template->show('footer');
    }
    
}

