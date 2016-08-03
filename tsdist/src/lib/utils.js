"use strict";
/**
 * slice a part of continuos elements in an Array
 */
var Slice = (function () {
    function Slice(array, start, end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }
    Slice.prototype.valueOf = function () {
        return this.array.slice(this.start, this.end);
    };
    Object.defineProperty(Slice.prototype, "length", {
        get: function () {
            return this.end - this.start;
        },
        enumerable: true,
        configurable: true
    });
    Slice.prototype.toString = function () {
        return this.valueOf().toString();
    };
    return Slice;
}());
exports.Slice = Slice;
//# sourceMappingURL=utils.js.map