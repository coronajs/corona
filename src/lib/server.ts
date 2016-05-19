import { RouteRecognizer } from 'route-recognizer'
import {Controller} from './controller'
import * as URL from 'url'
// import * as server from 'socket.io'
export class Server {
  private router: RouteRecognizer<Controller>;
  constructor(private io:SocketIO.Server, routes:any){
    this.io = io;
    this.router = new RouteRecognizer<Controller>();
    if(routes){
      var routesconfig = Object.keys(routes).map(function(i){
        return {path: i, handler: routes[i]};
      })

      this.router.add(routesconfig);
    }

    this.io.on('connection', this.handleConnection.bind(this))
  }

  route(path:string, ctrl:Controller){
    this.router.add([{path: path, handler: ctrl}])
  }

  handleConnection(connection:SocketIO.Socket){
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
