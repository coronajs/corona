"use strict";
/**
 * ObjectId from Mongodb
 */
function encodeInt(data, bits, forceBigEndian) {
    var max = Math.pow(2, bits);
    if (data >= max || data < -(max / 2)) {
        // console.warn("encodeInt::overflow");
        data = 0;
    }
    if (data < 0) {
        data += max;
    }
    for (var r = []; data; r[r.length] = String.fromCharCode(data % 256), data = Math.floor(data / 256))
        ;
    for (bits = -(-bits >> 3) - r.length; bits--; r[r.length] = "\0")
        ;
    return (forceBigEndian ? r.reverse() : r).join("");
}
;
/**
 * Machine id.
 *
 * Create a random 3-byte value (i.e. unique for this
 * process). Other drivers use a md5 of the machine id here, but
 * that would mean an asyc call to gethostname, so we don't bother.
 */
var MACHINE_ID = parseInt((Math.random() * 0xFFFFFF).toString(), 10);
var ObjectId = (function () {
    function ObjectId(id) {
        this.id = id;
        // Throw an error if it's not a valid setup
        if (id != null &&
            (id.length != 12 && id.length != 24))
            throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters in hex format");
        // Generate id based on the input
        if (null == id) {
            this.id = this.generate();
        }
        else if (/^[0-9a-fA-F]{24}$/.test(id)) {
            var result = '', str, num;
            for (var index = 0; index < 24; index += 2) {
                str = id.substr(index, 2);
                num = parseInt(str, 16);
                result += encodeInt(num, 8, false);
            }
            this.id = result;
        }
        else {
            this.id = id;
        }
    }
    ObjectId.prototype.generate = function () {
        var unixTime = parseInt((Date.now() / 1000).toString(), 10);
        var time4Bytes = encodeInt(unixTime, 32, true);
        var machine3Bytes = encodeInt(MACHINE_ID, 24, false);
        var pid2Bytes = encodeInt(process.pid, 24, false);
        var index3Bytes = encodeInt(this.get_inc(), 16, true);
        return time4Bytes + machine3Bytes + pid2Bytes + index3Bytes;
    };
    ObjectId.prototype.get_inc = function () {
        var self = this.constructor;
        return self.index = (self.index + 1) % 0xFFFF;
    };
    ;
    ObjectId.prototype.toHexString = function () {
        var hexString = '', num, value;
        for (var index = 0, len = this.id.length; index < len; index++) {
            value = this.id.charCodeAt(index);
            num = value <= 15
                ? '0' + value.toString(16)
                : value.toString(16);
            hexString = hexString + num;
        }
        return hexString;
    };
    ObjectId.index = 0;
    return ObjectId;
}());
exports.ObjectId = ObjectId;
//# sourceMappingURL=objectId.js.map