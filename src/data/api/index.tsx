import axios from "axios";

const urls = [
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/MUST-WATCH/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-LIVE-MATCHES/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-FEATURED/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-REPLAYS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-SHOWS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-HIGHLIGHTS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-SHORTS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-ORIGINALS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-NEWS/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-PRESSCONFERENCES/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-RIVALRIES/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-CLASSIC-MATCHES/ctv",
  "https://api-cdn1.optussport.tv/api/metadata/editorials/v2/HOME-FROMTHEVAULT/ctv",
];

export const getCards = () => {
  const requests = urls.map((url) => axios.get(url));
  return new Promise((resolve) => {
    Promise.all(requests).then((responses) => {
      const data = responses.map((res) => res.data);
      resolve(data);
    });
  });
};
