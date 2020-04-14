exports.extractVideoIds = (items) => {
  return items.map((item) => item.id.videoId).join(",");
};
