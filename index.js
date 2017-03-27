// index
/// Main file for require
'use strict';

module.exports = NodeZxingPdf417;

// Wrapped class
function NodeZxingPdf417 (opt) {
    
    var core = require('./src/core.js');
    
    // constructor params
    opt = opt || {};
    core.declareDep();
    
    // private functions
    function noop(){}

    // API/data for end-user
    return {
        decode: function (path, callback){
            
            // Fallback callback
            callback = callback || noop;
            try{
                core.readImage(path, function (er, result){
                    if (er){
                        callback(er, null);
                    }
                    else{
                        var ctx = core.getCanvas(result.image, result.size);
                        var source = new ZXing.BitmapLuminanceSource(ctx, result.image);
                        var binarizer = new ZXing.Common.HybridBinarizer(source);
                        var bitmap = new ZXing.BinaryBitmap(binarizer);
                        var res = JSON.parse(JSON.stringify(ZXing.PDF417.PDF417Reader.decode(bitmap, null, false), null, 4));
                        return callback(null, res);
                    }
                });
            }
            catch (er){
                callback(er, null);
            }
        },
    }
}

// Fallback init function
NodeZxingPdf417.init = function (opt){
    return NodeZxingPdf417(opt);
};