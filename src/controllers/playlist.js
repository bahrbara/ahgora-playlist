var axios = require("axios");

var config = require("../config");
var ytUtils = require("../utils/youtube");

const MAX_RESULTS = 50;

function contentDetails(ids) {
  console.info("Searching videos details");
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
  console.info("Searching videos snippets");
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
      // Find details for each video ID and merge the results
      return contentDetails(ids).then((details) => {
        return ytUtils.mergeSnippetsAndDetails(
          snippets.data.items,
          details.items
        );
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

exports.get = async (req, res) => {
  const dailyMin = req.query.dailyMin.split(",").map((n) => parseInt(n));
  const results = await search(req.query.term);
  const playlists = ytUtils.generatePlaylists(results, dailyMin);

  const data = {
    meta: {
      mostUsedWords: ytUtils.countMostPopularTerms(results, 5),
      dailyMin: req.query.dailyMin || "",
    },
    playlist: playlists,
  };

  res.json(data).status(200);
};
