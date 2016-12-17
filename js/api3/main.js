require([
    'esri/config',
    'esri/request',
    'constants/constants',
    'controllers/widgetloader',  
    'dojo/on',
    'dojo/parser',    
    'dojo/domReady!'
], function (
        esriConfig,
        esriRequest,
        constants,
        WidgetLoader, 
        on,
        parser        
        ) {
    parser.parse();
    
    var body = document.body;
    //esriConfig.defaults.kmlService = loc + "kml";
    esriConfig.defaults.io.proxyUrl = constants.URL + "proxy/proxy.php";
    esriConfig.defaults.io.alwaysUseProxy = false;
    function onConfigSuccess(response) {
        var loader = new WidgetLoader(response);
        loader.startup();        

    }
    function onConfigError(error) {
        console.log('ERROR - Loading config file:', error);
        

    }
    function requestParams(config) {
        return {
            url: constants.URL + 'config/' + config + '.json',
            handleAs: 'json'
        };
    }   
    if(window.config !== "") {
        esriRequest(requestParams(window.config)).then(onConfigSuccess, onConfigError);
    }
    
    //on(window, 'resize', function() { console.log('resize!')});
});
