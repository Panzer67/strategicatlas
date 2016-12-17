
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title><?php echo htmlspecialchars($title); ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'css/bootstrap.min.css' ?>">
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/api3/css/nihilo.css' ?>">
        <!--<link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/api3/css/esri.css' ?>">-->
        <link rel="stylesheet" href="https://js.arcgis.com/3.17/esri/css/esri.css">
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'css/main.css' ?>">
        <script>
            var config = <?php echo json_encode($config); ?>;
            var loc = "<?php echo Config::get('html/url') ?>";
        </script>
        
    </head>
    <body>
        
    </body>
    <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/api3/esriApi/esriApi3.17.js' ?>"></script>
    <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/api3/run.js' ?>"></script>
</html>


