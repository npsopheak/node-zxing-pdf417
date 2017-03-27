// core
'use strict';

// window = exports;

global.BigInteger = require("big-integer");
var Canvas = require('canvas')
    , Image = Canvas.Image;
global.ImageData = Canvas.ImageData;
global.ZXing = require('./lib/zxing-pdf417.js').ZXing;
var fs = require('fs');
var sizeOf = require('image-size');

module.exports = {
    declareDep: function (){
    },
    getCanvas: function (image, size){

        var canvas = new Canvas(size.width, size.height)
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, size.width, size.height); 
        return ctx;

    },
    readImage: function (path, callback){
        fs.readFile(path, function (er, file){
            if (er){
                return callback(er, null);
            }
            sizeOf(path, function (err, dimensions) {
                if (er){
                    return callback(er, null);
                }

                var img = new Image;
                img.src = file;

                callback(null, {
                    size: dimensions,
                    image: img
                })
            });
        });
    }
};