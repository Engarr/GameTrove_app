import axios from 'axios';
import getSimiliarGameInfo from '../util/getSimilarGameInfo.js';

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
    name, cover.url, aggregated_rating, aggregated_rating_count, first_release_date, follows, genres.name, rating, rating_count, screenshots.url, storyline, summary, videos.video_id, platforms.name, similar_games;
    where id = ${gameId};
    `;
    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const idsArr = response.data[0].similar_games;
    let similarGamesInfo = [];
    if (idsArr) {
      similarGamesInfo = await getSimiliarGameInfo(idsArr, token);
    }
    const gameDetails = response.data;
    const data = {
      gameDetails: gameDetails[0],
      similarGamesInfo,
    };

    res.status(200).json(data);
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

export const getSpecificGames = async (req, res, next) => {
  const { token } = req;
  const { category } = req.query;
  const { platform } = req.query;
  const { sort } = req.query;
  let { page } = req.query;
  const pageSize = req.query.pageSize || 10;
  let sorting = 'first_release_date desc';

  if (page === 'null') {
    page = '1';
  }
  if (sort === 'first_release_date asc') {
    sorting = 'first_release_date asc';
  } else if (sort === 'first_release_date desc') {
    sorting = 'first_release_date desc';
  } else if (sort === 'top_rated') {
    sorting = 'rating desc';
  } else if (sort === 'lowest_rated') {
    sorting = 'rating asc';
  } else if (sort === 'default') {
    sorting = 'first_release_date desc';
  }
  try {
    const offset = (page - 1) * pageSize;
    let genresFilter = 'genres != null';
    let platformFilter = 'platforms != null';

    if (category !== 'null' && category !== '1') {
      genresFilter += ` & genres = [${category}]`;
    } else if (category === '1') {
      genresFilter = `genres != null`;
    }

    if (platform !== 'null' && platform !== '0') {
      platformFilter += ` & platforms = [${platform}]`;
    } else if (platform === '0') {
      platformFilter = `platforms != null`;
    }

    const query = `
      fields name, cover.url, platforms.name, genres.name, summary,age_ratings.rating_cover_url, first_release_date, aggregated_rating_count, follows, rating;
      where ${platformFilter} & ${genresFilter} & first_release_date != null;
      offset ${offset};
      limit ${pageSize};
      sort ${sorting};
    `;
    const headers = {
      'Client-ID': process.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('https://api.igdb.com/v4/games', query, {
      headers,
    });
    const countQuery = `
      where ${platformFilter} & ${genresFilter} & first_release_date != null;
    `;

    const countResponse = await axios.post(
      'https://api.igdb.com/v4/games/count',
      countQuery,
      {
        headers,
      }
    );

    const totalGames = countResponse.data;

    const games = response.data;
    const responseData = {
      games,
      totalGames,
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.error('An error occured:', error);
    throw error;
  }
};

export const getComingGames = async (req, res, next) => {
  const { token } = req;
  const { platform } = req.params;
  const { limit } = req.body;
  try {
    const today = Math.floor(Date.now() / 1000);
    let filters = 'platforms != null';
    if (platform !== 'null' && platform !== '0') {
      filters += ` & platforms = [${platform}]`;
    } else if (platform === '0') {
      filters = `platforms != null`;
    }
    filters += ` & first_release_date > ${today}`;
    const query = `
    fields name, cover.url, first_release_date, platforms.name;
    where ${filters} & follows != null;
    sort follows desc ;
    limit ${limit};
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
