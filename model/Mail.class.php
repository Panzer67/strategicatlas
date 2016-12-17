<?php

class Mail {

      public $naam = NULL;
      public $email = NULL;
      public $onderwerp = NULL;
      public $boodschap = NULL;

      public function __construct($naam = NULL, $email = NULL, $onderwerp = NULL, $boodschap = NULL) {
             $this->naam = $naam;
             $this->email = $email;
             $this->onderwerp = $onderwerp;
             $this->boodschap = $boodschap;
             return $this;
      }
      
      public function verzenden() {

            $mailadres = "tjeerdjannieuwenhuis@gmail.com,contact@tjeerdjannieuwenhuis.nl";

            $sent = mail("$mailadres",
                 "$this->onderwerp",
                 "Van: $this->naam\r\n
                 Email: $this->email\r\n
                 Boodschap: $this->boodschap",
                 "From: $this->email\r\nBounce-to: tjeerdjannieuwenhuis@gmail.com");

             if(!$sent) {
                 return false;
             }
             else {
                 return true;
             }
      }
}



?>