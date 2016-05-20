import RouteRecognizer = require('route-recognizer');
import {Controller} from './controller'
import * as URL from 'url'
import * as server from 'socket.io'

interface IController {
  new (socket: SocketIO.Socket): Controller;
}


export default function (io: SocketIO.Server, routes: any = {}) {
  return new Server(io, routes);
}

export class Server {
  private router: RouteRecognizer<IController>;
  constructor(private io: SocketIO.Server, routes: any) {
    this.io = io;
    this.router = new RouteRecognizer<IController>();
    if (routes) {
      var routesconfig = Object.keys(routes).map(function (i) {
        return { path: i, handler: routes[i] };
      })

      this.router.add(routesconfig);
    }

    this.io.on('connection', this.handleConnection.bind(this))
  }

  route(path: string, ctrl: IController) {
    this.router.add([{ path: path, handler: ctrl }])
  }

  handleConnection(connection: SocketIO.Socket) {
    var url = URL.parse(connection.handshake.url, true);
    var routes = this.router.recognize(url.path);
    if (routes.length > 0) {
      let route = routes[0]
      var controller = new route.handler(connection);
      connection['controller'] = controller;
      controller.init(route.params);
    } else {
      connection.disconnect();
    }
  }
}