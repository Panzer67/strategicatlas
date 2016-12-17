

require([
    'esri/request',    
    'controllers/loader',    
    'dojo/domReady!'
], function (
        esriRequest,        
        Loader
        ) {

    function onConfigSuccess(response) {
        var loader = new Loader(response);
        loader.startup();

    }
    function onConfigError(error) {
        console.log('ERROR - Loading config file:', error);

    }
    function requestConfig(config) {
        return "http://localhost/strategicatlas/config/" + config + ".json";
    } 
    esriRequest(requestConfig(window.config), {responseType: "json"}).then(onConfigSuccess, onConfigError);

});
