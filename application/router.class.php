<?php

class Router {
 /*
 * @the registry
 */
      private $registry;

 /*
 * @the controller path
 */
      private $path;

      private $args = array();

      public $file;

      public $controller;

      public $action;

      public $tabel;

      public $taak;


      function __construct($registry) {
               $this->registry = $registry;
      }

 /**
 *
 * @set controller directory path
 *
 * @param string $path
 *
 * @return void
 *
 */
      function setPath($path) {

        /*** check if path is a directory ***/
        if (is_dir($path) == false)
        {
            throw new Exception ('Invalid controller path: `' . $path . '`');

        }
        /*** set the path ***/

        $this->path = $path;
      }


 /**
 *
 * @load the controller
 *
 * @access public
 *
 * @return void
 *
 */
      public function loader() {


        /*** check the route ***/
        $this->getController();

        /*** if the file is not there diaf ***/
        if (is_readable($this->file) == false)
        {
                Redirect::to('http://localhost/strategicatlas/');
                
        }

        /*** include the controller ***/
        include $this->file;

        /*** a new controller class instance ***/
        $class = $this->controller . 'Controller';
        $controller = new $class($this->registry);

        /*** check if the action is callable ***/
        if (is_callable(array($controller, $this->action)) == false)
        {
                Redirect::to('http://localhost/strategicatlas/' . $this->controller);        
                
        }
        else
        {

            $action = $this->action;
        }


        /*** run the action ***/
        $controller->$action($this->tabel, $this->taak);
      }


 /**
 *
 * @get the controller
 *
 * @access private
 *
 * @return void
 *
 */
      private function getController() {

         /*** get the route from the url ***/
         $route = (empty($_GET['rt'])) ? '' : $_GET['rt'];

         if (empty($route))
         {
             $route = 'home';
             //$track = new Tracker();
         }
         if (substr($route, -1) == '/'  ) {
              $route = rtrim($route, '/');
              Redirect::to($route);

         }         
         else {
             /*** get the parts of the route ***/

             $parts = explode('/', $route);
             $this->controller = $parts[0];
             
             if(isset($parts[2])) {
                   Redirect::to('http://localhost/strategicatlas/' . $parts[0] . '/' .$parts[1]);
                    
             }
             if(isset($parts[1])) {
                 if(Input::exists('post')) {
                    $this->tabel = Input::get('tabel');
                    $this->taak = Input::get('data');
                 }
                 $this->action = $parts[1];
             }
         }
         
         if (empty($this->controller))
         {
             $this->controller = 'home';             
         }
         /*** Get action ***/
         if (empty($this->action))
         {
             $this->action = 'index';  
         }
         /*** set the file path ***/
         $this->file = $this->path .'/'. $this->controller . 'Controller.php';
        
      }
}

?>