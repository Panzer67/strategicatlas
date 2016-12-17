require([
    'esri/config',
    'esri/request',
    'controllers/widgetloader',    
    'dojo/parser',    
    'dojo/domReady!'
], function (
        esriConfig,
        esriRequest,
        WidgetLoader,        
        parser        
        ) {
    parser.parse();
    var url = window.location.href;
    var body = document.body;
    esriConfig.defaults.kmlService = loc + "kml";
    esriConfig.defaults.io.proxyUrl = loc + "proxy/proxy.php";
    esriConfig.defaults.io.alwaysUseProxy = false;
    function onConfigSuccess(response) {
        var loader = new WidgetLoader(response);
        loader.startup();        

    }
    function onConfigError(error) {
        console.log('ERROR - Loading config file:', error);
        window.location = loc;

    }
    function requestParams(config) {
        return {
            url: loc + 'config/' + config + '.json',
            handleAs: 'json'
        };
    }   
    if(config !== "") {
        esriRequest(requestParams(config)).then(onConfigSuccess, onConfigError);
    }
   
});
