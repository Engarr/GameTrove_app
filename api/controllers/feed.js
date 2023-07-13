import axios from 'axios';

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
  const offset = Math.floor(Math.random() * 100);

  try {
    const query = `
    fields name, release_dates.date, cover.url, first_release_date, aggregated_rating, aggregated_rating_count, rating_count, rating;
    where cover.url != null & first_release_date > ${Math.floor(
      new Date('2023-01-01').getTime() / 1000
    )} & aggregated_rating != null;
    sort total_rating desc;
    limit 5;
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
    console.error('An error occured:', error);
    throw error;
  }
};

export const getCategoryGames = async (req, res, next) => {
  const { token } = req;
  // const offset = Math.floor(Math.random() * 50);

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
    const numbersToReject = [33, 2, 9, 26, 34, 11, 4, 30, 36, 24, 25, 35, 16];
    const newArr = categories.filter(
      (number) => !numbersToReject.includes(number.id)
    );

    const randomIndex = Math.floor(Math.random() * newArr.length);
    const randomCategory = newArr[randomIndex];
    const query = `
    
    fields name, cover.url, rating_count, rating, first_release_date;
    where genres = ${randomCategory.id} & first_release_date > 1500000000 & cover.url != null & rating_count != null & rating != null & themes != (42) & total_rating > 75;
    
    limit 9;
    
    `;
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
    console.error('An error occured:', error);
    throw error;
  }
};
export const getGameDetails = async (req, res, next) => {
  const { gameId } = req.params;
  const { token } = req;
  try {
    const query = `
    fields
    name, cover.url, aggregated_rating, aggregated_rating_count, first_release_date, follows, genres.name, rating, rating_count, screenshots.url, storyline, summary, videos.video_id;
    where id = ${gameId};
    `;
    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const gameDetails = response.data;

    res.status(200).json(gameDetails[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occured:', error);
    throw error;
  }
};
export const searchGames = async (req, res, next) => {
  const { token } = req;
  const searchValue = req.query.q;

  try {
    const query = `
    search "${searchValue}";
    fields name, cover.url;
    where name ~ "${searchValue}"*;
    limit 10;
    `;
    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const games = response.data;
    res.status(200).json(games);
  } catch (error) {
    console.error('An error occured:', error);
    throw error;
  }
};
