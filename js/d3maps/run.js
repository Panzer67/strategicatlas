(function () {
    var pathRx = new RegExp(/\/\[^\/]+$/);
    var locationPath = location.pathname.replace(pathRx, '');

    require({
        async: true,
        aliases: [
            ['text', 'dojo/text']
        ],
        packages: [{
                name: 'd3',
                location: loc + 'js/d3maps/d3'                
            },{
                name: 'controllers',
                location: loc + 'js/d3maps/controllers'
            }, {
                name: 'widgets',
                location: loc + 'js/d3maps/widgets'
            }, {
                name: 'app',
                location: loc + 'js/d3maps',
                main: 'main'
            }]
    }, ['app']);
})();
