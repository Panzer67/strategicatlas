<?php

Class minardController Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "minard";        
        //$this->registry->template->show('header');
        $this->registry->template->show('minard');
        //$this->registry->template->show('footer');
    }
    
}