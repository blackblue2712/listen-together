module.exports.getApiUrl = () => {
  return (
    process.env.REACT_APP_API_URL || "https://gcp-api-qqpyiv3e2a-as.a.run.app"
  );
};

module.exports.youtubeApiKey = () => {
  return (
    process.env.REACT_APP_YOUTUBE_API_KEY ||
    "AIzaSyBi4u9F0lE9kqYzQhy9ZkC2A_WM8zOdrQc"
  );
};
