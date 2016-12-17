<?php

class Validate {
      private $_passed = false,
              $_errors = array(),
              $_db = null;

      public function __construct() {
             $this->_db = db::getInstance();
      }

      public function check($source, $items = array()) {
             foreach($items as $item => $rules) {
                 foreach($rules as $rule => $rule_value) {

                         $value = trim($source[$item]);
                         $item = escape($item);
                         $name = array_values($rules)[0];

                         if($rule === 'required' && empty($value)) {
                             $this->addError($name, "{$name} is verplicht");
                         }
                         else if(!empty($value)) {
                              switch($rule) {
                                 case 'min':
                                     if(strlen($value) < $rule_value) {
                                            $this->addError($name, "{$name} must be a minimum of {$rule_value} characters.");
                                     }
                                 break;
                                 case 'max':
                                     if(strlen($value) > $rule_value) {
                                            $this->addError($name, "{$name} must be a maximum of {$rule_value} characters.");
                                     }
                                 break;
                                 case 'matches':
                                      if($value != $source[$rule_value]) {
                                           $this->addError($name, "{$rule_value} must match {$name}");
                                      }
                                 break;
                                 case 'unique':
                                      $check = $this->_db->get($rule_value, array($item, '=', $value));
                                      if($check->count()) {
                                           $this->addError($name, "{$name} already exists.");
                                      }
                                 break;
                                 case 'email_check':
                                       if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                                           $this->addError($name, "Incorrect emailadres!");
                                       }
                                 break;

                              }
                         }


                 }
             }

             if(empty($this->_errors)) {
                  $this->_passed = true;
             }
             return $this;
      }

      private function addError($name, $error) {
              $this->_errors[$name] = array();
              $this->_errors[$name] = $error;
      }

      public function errors() {
              $this->addError("error","error");
              return $this->_errors;
      }

      public function passed() {
             return $this->_passed;
      }

}



?>