var config = require("../config");
var youtube = require("../utils/youtube");

exports.get = (req, res, next) => {
  res.status(201).send("Requisição recebida com sucesso!");
};
