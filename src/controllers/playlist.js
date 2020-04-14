var axios = require("axios");
var config = require("../config");
var ytUtils = require("../utils/youtube");

const MAX_RESULTS = 5;

function details(ids) {
  return axios
    .get(config.youtubeAPI.videos, {
      params: {
        part: "contentDetails",
        id: ids,
        key: process.env.API_KEY,
      },
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function search(term) {
  return axios
    .get(config.youtubeAPI.search, {
      params: {
        part: "snippet",
        q: term,
        key: process.env.API_KEY,
        maxResults: MAX_RESULTS,
      },
    })
    .then(async function (snippets) {
      const ids = ytUtils.extractVideoIds(snippets.data.items);

      return details(ids).then((contentDetails) => {
        return contentDetails;
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

exports.get = async (req, res) => {
  const results = await search(req.query.term);
  res.json(results).status(200);
};
