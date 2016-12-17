(function () {   
    var url = window.url;    
    require({
        async: true,
        aliases: [
            ['text', 'dojo/text']
        ],
        packages: [{
                name: 'd3',
                location: url + 'js/api3/d3'                
            }, {
                name: 'controllers',
                location: url + 'js/api3/controllers'
            },{
                name: 'constants',
                location: url + 'js/api3/constants'
            },{
                name: 'services',
                location: url + 'js/api3/services'
            }, {
                name: 'widgets',
                location: url + 'js/api3/widgets'
            }, {
                name: 'app',
                location: url + 'js/api3',
                main: 'main'
            }]
    }, ['app']);
})();