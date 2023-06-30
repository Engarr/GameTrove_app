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
    // eslint-disable-next-line no-console
    console.error('Wystąpił błąd:', error);
  }
};

export const getBannerGames = async (req, res, next) => {
  const { token } = req;
  const offset = Math.floor(Math.random() * 50);

  try {
    const query = `
    fields name, release_dates.date, cover.url, first_release_date, aggregated_rating, aggregated_rating_count, rating_count, rating;
    where cover.url != null & first_release_date > ${Math.floor(
      new Date('2023-01-01').getTime() / 1000
    )} & aggregated_rating != null;
    sort total_rating desc;
    limit 3;
    offset ${offset};
    `;

    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const newGames = response.data;

    res.status(200).json(newGames);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Wystąpił błąd:', error);
    throw error;
  }
};

export const getNewCategoryGames = async (req, res, next) => {
  const { token } = req;
  try {
    const categoriesResponse = await axios.post(
      'https://api.igdb.com/v4/genres',
      'fields id, name; limit 100;',
      {
        headers: {
          'Client-ID': process.env.VITE_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const categories = categoriesResponse.data;
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];

    const query = `fields name, release_dates.date, cover.url, first_release_date; 
    where genres = ${
      randomCategory.id
    } & release_dates.date != null & cover.url != null & first_release_date > ${Math.floor(
      new Date('2023-01-01').getTime() / 1000
    )};
    sort release_dates.date desc;
    
    limit 50;`;
    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const newsGames = response.data;
    res.status(200).json({ newsGames, category: randomCategory });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Wystąpił błąd:', error);
    throw error;
  }
};
