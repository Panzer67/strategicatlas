<?php

Class homeController Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        //$this->registry->template->show('header');
        $this->registry->template->show('home');
        //$this->registry->template->show('footer');
    }
    
    public function map() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->show('map');
    }

}

?>
