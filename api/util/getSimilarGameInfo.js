import axios from 'axios';

const getSimiliarGameInfo = async (idsArr, token) => {
  const fetchGameInfo = async (gameId) => {
    try {
      const query = `
            fields
            name, cover.url;
            where id = ${gameId};
            `;
      const headers = {
        'Client-ID': process.env.VITE_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        'https://api.igdb.com/v4/games',
        query,
        {
          headers,
        }
      );

      return response.data[0];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occured:', error);
      throw error;
    }
  };
  const SimilarGameInfo = await Promise.all(
    idsArr.map((gameId) => fetchGameInfo(gameId))
  );
  return SimilarGameInfo;
};

export default getSimiliarGameInfo;
