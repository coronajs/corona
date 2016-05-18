import {EventEmitter} from 'events';
import * as URL from 'url';
import {RootModel} from './models';
/**
 * controller acts as a facade which resolves all the request from clients(in rpc mode)
 * and interact with other objects
 */
export class Controller extends EventEmitter {
	// private socket;
	// MAYBE we should move __handleXXX function outside controller to achieve the ability of controller behavior change
	constructor(socket) {
		super();
		this.socket = socket;
		this.url = URL.parse(socket.handshake.url, true);
		this.params = this.url.query;
		this.data = new RootModel({});
		socket.on('rpc:invoke',
			this.__handleCall.bind(this)
		).on('cast',
			this.__handleCast.bind(this)
		).on('subscribe',
			this.subscribe.bind(this)
		).on('disconnect', this.onexit.bind(this))
		this.syncConfig = {};
		this.init(this.params);
		this.startSync();
		socket.emit('initialized'); // tell client we are ready

	}

	/**
   * called when controller initialized
   * override by subclass to do initialization
   * @params params any extracted from url
   */
	init(params) {

	}

	/**
	 * which part of data should corona send to client?
	 */
	sync(config){
		this.syncConfig = config;
	}

	/**
	 */
	startSync(){

	}

	__handleCall(method, reqId, args) {
		if (typeof this[method] === 'function') {
			if(!(args instanceof Array)){
				args = [args]
			}
			try {
				var res = this[method].apply(this, args);
			} catch (e) {
				console.log(e);
				return this.socket.emit('rpc:error', reqId, e)
			}

			if (res && (typeof res.then === 'function')) {
				res.then(
					(data) => this.socket.emit('rpc:result', reqId, data)
				).catch(
					(err) => this.socket.emit('rpc:error', reqId, err)
					)
			} else {
				this.socket.emit('rpc:result', reqId, res)
			}
		} else {
			this.socket.emit('rpc:error', reqId, "the method does not exist")
		}
	}

	__handleCast(method, args) {
		if (typeof this[method] === 'function') {
			this[method].apply(this, args);
		}
	}


	/**
   * client ask to subscribe to one of certain object's events
   */
	subscribe(objid, event) {
		var self = this;
		this[objid].on(event, function (...args) {
			self.socket.emit('event', objid, event, args);
		});
	}

	/**
   * called when the client disconnect
   * override by subclass to do some clean job
   */
	onexit() {

	}

	/**
   * to close connection and quit
   */
	exit() {
    this.onexit();
    this.socket.close();
		this.emit('exit')
		delete this.socket;
	}
}
