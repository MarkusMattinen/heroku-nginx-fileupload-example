var path = require('path');
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

app.use(fileUpload());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/upload', function(req, res) {
  var newFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  req.files.newFile.mv(path.join('/data', req.files.newFile.name), function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.redirect('/' + req.files.newFile.name);
    }
  });
});

app.listen(process.env.PORT || 5000);

