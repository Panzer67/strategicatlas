
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo htmlspecialchars($title); ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-1.0.5.min.js' ?>"></script>
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-arcgis-parser-1.0.4.min.js' ?>"></script>
        <link rel="stylesheet" href="http://localhost/strategicatlas/js/api4/css/main.css">
        <link rel="stylesheet" href="https://js.arcgis.com/4.1/esri/css/main.css">        
        <script>
            var config = <?php echo json_encode($config); ?>;
            var loc = "<?php echo Config::get('html/url') ?>";
        </script>
        <script src="https://js.arcgis.com/4.1/"></script>
    </head>
    <body class="claro calcite">  
        <div>
            <div id="map-wrapper"></div>
            <div id="pane-wrapper"></div>
        </div>
    </body>    
    <script type="text/javascript" src="http://localhost/strategicatlas/js/api4/run.js"></script>
</html>
