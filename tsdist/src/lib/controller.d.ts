import { EventEmitter } from 'events';
/**
 * controller acts as a facade which resolves all the request from clients(in rpc mode)
 * and interact with other objects
 */
export declare class Controller extends EventEmitter {
    protected socket: SocketIO.Socket;
    protected url: any;
    protected params: any;
    private syncConfig;
    private exposedMethods;
    constructor(socket: SocketIO.Socket);
    /**
   * called when controller initialized
   * override by subclass to do initialization
   * @params params any extracted from url
   */
    init(params: any, done?: Function): PromiseLike<any>;
    /**
     * which part of data should corona send to client?
     */
    sync(config: any): void;
    /**
     *
     */
    expose(...methods: string[]): void;
    /**
     */
    startSync(): void;
    __handleCall(method: string, reqId: number, args: any[]): SocketIO.Socket;
    __handleCast(method: string, args: any[]): void;
    /**
   * client ask to subscribe to one of certain object's events
   */
    subscribe(keypath: string, event: string): void;
    /**
     * return Model for client
     */
    getModel(keypath: string): any;
    getModelSpec(keypath: string): any;
    getMultiModelSpec(keypaths: string[]): {};
    /**
   * called when the client disconnect
   * override by subclass to do some clean job
   */
    onexit(): void;
    /**
   * to close connection and quit
   */
    exit(): void;
}
