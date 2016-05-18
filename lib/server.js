import * as RouteRecognizer from 'route-recognizer'
import * as URL from 'url'

export class Server {
  constructor(io, routes){
    this.io = io;
    this.router = new RouteRecognizer();
    if(routes){
      var routesconfig = Object.keys(routes).map(function(i){
        return {path: i, handler: routes[i]};
      })

      this.router.add(routesconfig);
    }

    this.io.on('connection', this.handleConnection.bind(this))
  }

  route(path, ctrl){
    this.router.add([{path: path, handler: ctrl}])
  }

  handleConnection(connection){
    var url = URL.parse(connection.handshake.url, true);
    var result = this.router.recognize(url.path);
    if(result.length > 0){
      result = result[0]
      connection.controller = new result.handler(connection);
      connection.controller.init(result.params);
    } else {
      connection.close();
    }
  }
}

module.exports = function(io){
  return new Server(io);
}
