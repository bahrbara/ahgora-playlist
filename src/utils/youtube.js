var moment = require("moment");

exports.extractVideoIds = (items) => {
  return items.map((item) => item.id.videoId).join(",");
};

exports.mergeSnippetsAndDetails = (snippets, details) => {
  snippets.forEach((snippet) => {
    const video = details.find((detail) => detail.id == snippet.id.videoId);

    video.contentDetails.duration = convertVideoDuration(
      video.contentDetails.duration
    );
    snippet["contentDetails"] = video.contentDetails;
  });
  return snippets;
};

function convertVideoDuration(time) {
  return Math.floor(moment.duration(time).asMinutes());
}
