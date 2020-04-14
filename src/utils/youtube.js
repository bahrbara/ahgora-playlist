var moment = require("moment");

exports.extractVideoIds = (items) => {
  return items.map((item) => item.id.videoId).join(",");
};

exports.mergeSnippetsAndDetails = (snippets, details) => {
  console.info("Merging videos snippets and details");
  snippets.forEach((snippet) => {
    const video = details.find((detail) => detail.id == snippet.id.videoId);

    video.contentDetails.duration = convertVideoDuration(
      video.contentDetails.duration
    );
    snippet["contentDetails"] = video.contentDetails;
  });
  return snippets;
};

exports.countMostPopularTerms = (items, limit) => {
  let text = "";
  items.forEach((item) => {
    text += item.snippet.title + " " + item.snippet.description;
  });
  let words = text.split(" ");
  words = sortByFrequency(words);
  return words.slice(0, limit);
};

function convertVideoDuration(time) {
  return Math.floor(moment.duration(time).asMinutes());
}

// https://stackoverflow.com/questions/3579486/sort-a-javascript-array-by-frequency-and-then-filter-repeats
function sortByFrequency(array) {
  var frequency = {};

  array.forEach(function (value) {
    frequency[value] = 0;
  });

  var uniques = array.filter(function (value) {
    return ++frequency[value] == 1;
  });

  return uniques.sort(function (a, b) {
    return frequency[b] - frequency[a];
  });
}
