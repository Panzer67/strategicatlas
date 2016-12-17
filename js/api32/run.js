(function () {
    var pathRx = new RegExp(/\/\[^\/]+$/);
    var locationPath = location.pathname.replace(pathRx, '');
    
    require({
        async: true,
        aliases: [
            ['text', 'dojo/text']
        ],
        packages: [{
                name: 'controllers',
                location: loc + 'js/api3/controllers'
            }, {
                name: 'services',
                location: loc + 'js/api3/services'
            }, {
                name: 'widgets',
                location: loc + 'js/api3/widgets'
            }, {
                name: 'app',
                location: loc + 'js/api3',
                main: 'main'
            }]
    }, ['app']);
})();