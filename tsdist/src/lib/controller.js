"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var URL = require('url');
var _ = require('lodash');
var model_1 = require('./model/model');
/**
 * controller acts as a facade which resolves all the request from clients(in rpc mode)
 * and interact with other objects
 */
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller(socket) {
        var _this = this;
        _super.call(this);
        this.socket = socket;
        this.exposedMethods = [];
        this.socket = socket;
        this.url = URL.parse(socket.handshake.url, true);
        this.params = this.url.query;
        socket.on('rpc:invoke', this.__handleCall.bind(this)).on('cast', this.__handleCast.bind(this)).on('subscribe', this.subscribe.bind(this)).on('disconnect', this.onexit.bind(this));
        this.syncConfig = {};
        var initialized = false;
        var done = function () {
            if (!initialized) {
                initialized = true;
                socket.emit('meta:methods', _this.exposedMethods);
                socket.emit('initialized');
                _this.startSync();
            }
        };
        var ret = this.init(this.params, done);
        // if init return a promise, automatic call done when promise is resolved
        // if (ret && typeof ret['then'] === 'Function') {
        // 	console.log('a promise')
        // 	ret.final(done);
        // }
        // tell client we are ready
    }
    /**
   * called when controller initialized
   * override by subclass to do initialization
   * @params params any extracted from url
   */
    Controller.prototype.init = function (params, done) {
        return;
    };
    /**
     * which part of data should corona send to client?
     */
    Controller.prototype.sync = function (config) {
        this.syncConfig = config;
    };
    /**
     *
     */
    Controller.prototype.expose = function () {
        var methods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            methods[_i - 0] = arguments[_i];
        }
        this.exposedMethods = this.exposedMethods.concat(_.flatten(methods));
    };
    /**
     */
    Controller.prototype.startSync = function () {
    };
    Controller.prototype.__handleCall = function (method, reqId, args) {
        var _this = this;
        if (typeof this[method] === 'function') {
            if (!(args instanceof Array)) {
                args = [args];
            }
            try {
                var res = this[method].apply(this, args);
            }
            catch (e) {
                console.log(e);
                return this.socket.emit('rpc:error', reqId, e);
            }
            if (res && (typeof res.then === 'function')) {
                res.then(function (data) { return _this.socket.emit('rpc:result', reqId, data); }).catch(function (err) { return _this.socket.emit('rpc:error', reqId, err); });
            }
            else {
                this.socket.emit('rpc:result', reqId, res);
            }
        }
        else {
            this.socket.emit('rpc:error', reqId, "the method does not exist");
        }
    };
    Controller.prototype.__handleCast = function (method, args) {
        if (typeof this[method] === 'function') {
            this[method].apply(this, args);
        }
    };
    /**
   * client ask to subscribe to one of certain object's events
   */
    Controller.prototype.subscribe = function (keypath, event) {
        var _this = this;
        this.getModel(keypath).on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            (_a = _this.socket).emit.apply(_a, ['event', keypath, event].concat(args));
            var _a;
        });
    };
    /**
     * return Model for client
     */
    Controller.prototype.getModel = function (keypath) {
        var keypaths = keypath.split('.');
        if (keypaths.length == 0) {
            return;
        }
        var ret = this[keypaths.shift()];
        while (keypaths.length > 0) {
            if (ret instanceof model_1.Model) {
                return ret.getModel(keypaths.join('.'));
            }
            var p = keypaths.shift();
            if (ret[p]) {
                ret = ret[p];
            }
            else {
                return;
            }
        }
        return ret;
    };
    Controller.prototype.getModelSpec = function (keypath) {
        return this.getModel(keypath).toJSON();
    };
    Controller.prototype.getMultiModelSpec = function (keypaths) {
        var _this = this;
        return _.zipObject(keypaths, keypaths.map(function (keypath) { return _this.getModel(keypath).toJSON(); }));
    };
    /**
   * called when the client disconnect
   * override by subclass to do some clean job
   */
    Controller.prototype.onexit = function () {
    };
    /**
   * to close connection and quit
   */
    Controller.prototype.exit = function () {
        this.onexit();
        this.socket.disconnect();
        this.emit('exit');
        delete this.socket;
    };
    return Controller;
}(events_1.EventEmitter));
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map