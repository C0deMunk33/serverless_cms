//using express.js serve static files from ./web
var express = require('express');
var app = express();
app.use(express.static('web'));

// serve /ipfs/{id} as a static file from ./web/ipfs/{id}
app.use('/ipfs/:id', function(req, res) {
    res.sendFile
    ('./web/ipfs/' + req.params.id, {root: __dirname});
});




app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    }
);

