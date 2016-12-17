(function () {
    var pathRx = new RegExp(/\/\[^\/]+$/);
    var locationPath = location.pathname.replace(pathRx, '');
    var loc = 'http://localhost/strategicatlas/';
    
    require({
        async: true,
        aliases: [
            ['text', 'dojo/text']
        ],
        packages: [{
                name: 'controllers',
                location: loc + 'js/api4/controllers'
            }, {
                name: 'services',
                location: loc + 'js/api4/services'
            }, {
                name: 'widgets',
                location: loc + 'js/api4/widgets'
            }, {
                name: 'app',
                location: loc + 'js/api4',
                main: 'main'
            }]
    }, ['app']);


})();