const app = require("../src/app");
var config = require("../src/config");

app.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}`);
});
