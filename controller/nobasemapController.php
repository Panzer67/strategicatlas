<?php

Class nobasemapController Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "nobasemap";        
        //$this->registry->template->show('header');
        $this->registry->template->show('map');
        //$this->registry->template->show('footer');
    }
    
}