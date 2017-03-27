var NodeZxingPdf417 = require('../index.js');
var instance = new NodeZxingPdf417();
instance.decode('images/bp.jpg', function (er, result){
    console.log(er, result);
});
