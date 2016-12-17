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
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'js/api3/css/esri.css' ?>">
        <link rel="stylesheet" href="<?php echo Config::get('html/url') . 'css/main.css' ?>">
        <script>
            var config = ""
            var loc = "<?php echo Config::get('html/url') ?>";
        </script>
        <!--<script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/api3/esriApi/esriApi3.17.js' ?>"></script>-->
    </head>
    <body>
        <div class="container-fluid wrapper">
            <div class="jumbotron">
                <div class="container">
                    <h1>Strategic Atlas</h1>
                    <h3>A Geopolitical Information System</h3>
                </div>
            </div>
            <div class="innerWrapper">
                <div class="row">
                    <div class="col-xs-6 col-md-2">  
                        <a href="<?php echo Config::get('html/url') . 'nuke' ?>" class="thumbnail">
                            <h4>Nukes</h4>   
                        </a>
                    </div> 
                    <div class="col-xs-6 col-md-2">
                        <a href="<?php echo Config::get('html/url') . 'nobasemap' ?>" class="thumbnail">
                            <h4>No Basemap</h4>
                        </a>
                    </div> 

                    <div class="col-xs-6 col-md-2">
                        <a href="<?php echo Config::get('html/url') . 'northkorea' ?>" class="thumbnail">
                            <h4>North Korea Military</h4>
                        </a>
                    </div>    
                    <div class="col-xs-6 col-md-2">
                        <a href="<?php echo Config::get('html/url') . 'mapd3' ?>" class="thumbnail">
                            <h4>Map D3.js</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-2">
                        <a href="http://localhost/strategicatlas/api4" class="thumbnail">
                            <h4>API 4</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-2">
                        <a href="http://localhost/strategicatlas/minard" class="thumbnail">
                            <h4>The March to Moscow</h4>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-2">
                        <a href="<?php echo Config::get('html/url') . 'baltictheater' ?>" class="thumbnail">
                            <h4>The Baltic Strategic Theater</h4>
                        </a>
                    </div> 
                </div>

            </div>
        </div>
    </body>

    <!--<script type="text/javascript" src="<?php echo Config::get('html/url') . 'js/api3/run.js' ?>"></script>-->
</html>


