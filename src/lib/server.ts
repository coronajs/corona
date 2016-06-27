import RouteRecognizer = require('route-recognizer');
import {Controller} from './controller'
import * as URL from 'url'
import * as socketio from 'socket.io'
import * as http from 'http'

interface IController {
  new (socket: SocketIO.Socket): Controller;
}


export default function (io: SocketIO.Server, routes: any = {}) {
  return new Server(io, routes);
}

export class Server {
  private router: RouteRecognizer<IController>;
  private io: SocketIO.Server;
  constructor(routes: any, private server: http.Server, opts: SocketIO.ServerOptions = {}) {
    opts['path'] = '/corona';
    this.io = socketio(server, opts);
    this.router = new RouteRecognizer<IController>();

    // add route
    if (routes) {
      Object.keys(routes).map((k) => {
        this.route(k, routes[k]);
      });
    }

  }

  route(path: string, ctrl: IController) {
    this.router.add([{ path: path, handler: ctrl }]);
    this.io.of(path).on('connection', this.handleConnection.bind(this));
  }

  handleConnection(connection: SocketIO.Socket) {
    var routes = this.router.recognize(connection.nsp.name);
    if (routes && routes.length > 0) {
      let route = routes[0]
      var controller = new route.handler(connection);
      connection['controller'] = controller;
    } else {
      connection.disconnect();
    }
  }
}
