import axios from 'axios';

const getToken = async (req, res, next) => {
  const url = 'https://id.twitch.tv/oauth2/token';
  const params = new URLSearchParams({
    client_id: process.env.VITE_CLIENT_ID,
    client_secret: process.env.VITE_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(url, params);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token, expires_in } = response.data;
    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + expires_in);

    if (expirationTime > new Date()) {
      req.token = access_token;
      next();
    } else {
      const refreshParams = new URLSearchParams({
        client_id: process.env.VITE_CLIENT_ID,
        client_secret: process.env.VITE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: access_token,
      });
      const refreshResponse = await axios.post(url, refreshParams);
      const { newAccessToken } = refreshResponse.data;
      req.token = newAccessToken;
      next();
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania tokenu IGDB:', error);
    res.status(500).json({ error: 'Błąd podczas pobierania tokenu IGDB' });
  }
};

export default getToken;
