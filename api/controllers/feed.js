import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getGames = async (req, res, next) => {
  const { token } = req;

  try {
    const url = 'https://api.twitch.tv/helix/games/top';
    const params = {
      first: 20,
    };

    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { params, headers });
    const games = response.data.data;

    res.status(200).json(games);
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania gier:', error);
    res.status(500).json({ error: 'Błąd podczas pobierania gier' });
  }
};
