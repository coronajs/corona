"use strict";
var RouteRecognizer = require('route-recognizer');
var URL = require('url');
var socketio = require('socket.io');
function default_1(io, routes) {
    if (routes === void 0) { routes = {}; }
    return new Server(io, routes);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var Server = (function () {
    function Server(routes, server) {
        this.server = server;
        this.io = socketio(server);
        this.router = new RouteRecognizer();
        if (routes) {
            var routesconfig = Object.keys(routes).map(function (i) {
                return { path: i, handler: routes[i] };
            });
            this.router.add(routesconfig);
        }
        this.io.on('connection', this.handleConnection.bind(this));
    }
    Server.prototype.route = function (path, ctrl) {
        this.router.add([{ path: path, handler: ctrl }]);
    };
    Server.prototype.handleConnection = function (connection) {
        var url = URL.parse(connection.handshake.url, true);
        var routes = this.router.recognize(url.path);
        if (routes && routes.length > 0) {
            var route = routes[0];
            var controller = new route.handler(connection);
            connection['controller'] = controller;
        }
        else {
            connection.disconnect();
        }
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map