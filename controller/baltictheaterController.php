<?php

Class baltictheaterController Extends baseController {

    public function index() {
        $this->registry->template->title = "Strategic Atlas";
        $this->registry->template->config = "baltictheater";        
        //$this->registry->template->show('header');
        $this->registry->template->show('baltictheater');
        //$this->registry->template->show('footer');
    }
    
    public function requestInfo($tabel, $data) {        
        $this->registry->db->get("content_infopane", array('id', '=', $data));        
        $result = $this->registry->db->first();
        echo json_encode($result);
    }
    
    public function requestAllAvailableTitles() {
        $this->registry->db->query("SELECT id, DATE_FORMAT(content_infopane.datum, '%d-%m-%Y') as date, titel FROM content_infopane ORDER BY id desc");
        $results = $this->registry->db->results();
        echo json_encode($results);
    }
}