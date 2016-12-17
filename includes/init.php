<?php

session_start();
ob_start();

 $GLOBALS['config'] = array(
       'mysql' => array(
             'host' => '127.0.0.1',
             'username' => 'root',
             'password' => 'panzer2001',
             'db' => 'strategicatlas'
       ),
        'remember' => array(
             'cookie_name' => 'hash',
             'cookie_expiry' => 604800
       ),
       'session' => array(
             'session_name' => 'gebruiker',
             'token_name' => 'token'
       ),
       'html' => array(
             'url' => 'http://localhost/strategicatlas/',
       )
 );


 /*** include the controller class ***/
 include __SITE_PATH . '/application/' . 'controller_base.class.php';

 /*** include the registry class ***/
 include __SITE_PATH . '/application/' . 'registry.class.php';

 /*** include the router class ***/
 include __SITE_PATH . '/application/' . 'router.class.php';

 /*** include the template classes ***/
 include __SITE_PATH . '/application/' . 'template.class.php';

 //include __SITE_PATH . '/controller/' . 'dataHandler.php';
 /*** auto load model classes  spl_autoload_register() encouraged by PHP see alternative in classesexample ***/

spl_autoload_register(function($class) {
       require_once __SITE_PATH . '/model/' . $class . '.class.php';
});

require_once 'functions/sanitize.php';


 /*** a new registry object ***/
 $registry = new registry;
 $registry->db = db::getInstance();
?>