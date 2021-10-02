import axios from "axios";
import { getYoutubeKey } from "../helpers/getYoutubeKey";

export const searchYoutubeV3 = async (keyword) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=${getYoutubeKey()}&q=${keyword}`;

  const resp = await axios.get(url);

  return resp.data.items[0];
};
