<?php


header("Access-Control-Allow-Origin: *");
$site_path = realpath(dirname(__FILE__));
define('__SITE_PATH', $site_path);
include 'includes/init.php';

$registry->router = new Router($registry);

$registry->router->setPath(__SITE_PATH . '/controller');



/** load up the template ** */
$registry->template = new template($registry);

/** load the controller * */
$registry->router->loader();
?>