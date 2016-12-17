<!DOCTYPE html>
<html>
    <head>
        <title><?php echo htmlspecialchars($title); ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <!--<link rel="stylesheet" href="<?php echo Config::get('html/url') . 'css/bootstrap.min.css' ?>">-->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/api31/css/nihilo.css' ?>">
        <!--<link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/api3/css/esri.css' ?>">-->
        <link rel="stylesheet" href="https://js.arcgis.com/3.17/esri/css/esri.css">
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/minard/css/d3maps.css' ?>">
        <!--<script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-1.0.5.min.js' ?>"></script>
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-arcgis-parser-1.0.4.min.js' ?>"></script>
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/d3maps/d3/topojson.v1.min.js' ?>"></script>-->
        <script>
            var config = <?php echo json_encode($config); ?>;
            var loc = "<?php echo Config::get('html/url') ?>";
        </script>
        <script type="text/javascript" src="http://js.arcgis.com/3.17compact"></script>
    </head>
    <body>
        
    </body>
    
    <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/minard/run.js' ?>"></script>
</html>



