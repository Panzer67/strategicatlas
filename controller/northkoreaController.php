<?php

Class northkoreaController Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "config2";        
        //$this->registry->template->show('header');
        $this->registry->template->show('map31');
        //$this->registry->template->show('footer');
    }
    
    public function requestInfo() {
        $this->registry->db->query("SELECT * FROM content_infopane WHERE id = 1");
        $result = $this->registry->db->first();
        echo json_encode($result);
    }
    
}