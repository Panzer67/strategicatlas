<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" 
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
    <head>
        <title><?php echo htmlspecialchars($title); ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://js.arcgis.com/3.18/esri/themes/calcite/dijit/calcite.css">
        <link rel="stylesheet" href= "https://js.arcgis.com/3.18/dijit/themes/claro/claro.css"> 
        <link rel="stylesheet" href="https://js.arcgis.com/3.18/esri/css/esri.css">
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'css/main1.css' ?>">
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-1.0.5.min.js' ?>"></script>
        <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/terraformer/terraformer-arcgis-parser-1.0.4.min.js' ?>"></script>
        <script src="https://js.arcgis.com/3.18/"></script>        
        <script>
            var config = <?php echo json_encode($config); ?>;
            var url = "<?php echo Config::get('html/url') ?>";
        </script>

    </head>
    <body class="claro calcite">
        
    </body>    
    <script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/api3/run.js' ?>"></script>
</html>


