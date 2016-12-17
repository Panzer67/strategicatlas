require([
    'd3/d3.v3.min',    
    'dojo/on',
    'dojo/dom',
    'esri/config',
    'esri/request',
    'controllers/loader',      
    'dojo/domReady!'
], function (d3, on, dom, esriConfig, esriRequest, Loader) {

    esriConfig.defaults.io.proxyUrl = loc + "proxy/proxy.php";
    esriConfig.defaults.io.alwaysUseProxy = false;
    function onConfigSuccess(response) {
        var loader = new Loader(response);
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


