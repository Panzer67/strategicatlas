(function () {
    //var pathRx = new RegExp(/\/\[^\/]+$/);
    //var locationPath = location.pathname.replace(pathRx, '');

    require({
        async: true,
        aliases: [
            ['text', 'dojo/text']
        ],
        packages: [{
                name: 'd3',
                location: loc + 'js/minard/d3'                
            },{
                name: 'controllers',
                location: loc + 'js/minard/controllers'
            }, {
                name: 'widgets',
                location: loc + 'js/minard/widgets'
            }, {
                name: 'app',
                location: loc + 'js/minard',
                main: 'main'
            }]
    }, ['app']);
})();
