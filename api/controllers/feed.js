import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getGames = async (req, res, next) => {
  const { token } = req;

  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `
      fields name, summary, platforms.name, genres.name, release_dates.date, cover.url;
      where release_dates.date != null & release_dates.date >= ${Math.floor(
        new Date().getFullYear()
      )};
      sort release_dates.date asc;
      limit 10;
      `,
      {
        headers: {
          'Client-ID': process.env.VITE_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const games = response.data;

    res.status(200).json(games);
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
};

export const getNotReleased = async (req, res, next) => {
  const { token } = req;
  try {
    const url = 'https://api.igdb.com/v4/games';
    const fields = 'name, cover';
    const sort = 'rating desc';
    const limit = 100;
    const body = `fields ${fields}; sort ${sort}; limit ${limit};`;

    const gamesResponse = await axios.post(url, body, {
      headers: {
        'Client-ID': process.env.VITE_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const games = gamesResponse.data;
    console.log(games);
    const imageIds = games
      .filter((game) => game.cover)
      .map((game) => game.cover.id);

    console.log(imageIds);
    // res.status(200).json(games.data);
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
};
