<?php

Class mapd3Controller Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "d3config";        
        //$this->registry->template->show('header');
        $this->registry->template->show('mapd3');
        //$this->registry->template->show('footer');
    }
    
    public function requestInfo() {
        $this->registry->db->query("SELECT * FROM minard_text WHERE id = 1");
        $result = $this->registry->db->first();
        echo json_encode($result);
    }
    
}