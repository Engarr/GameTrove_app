import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './page/RootLayout/RootLayout';
import Home from './page/HomePage/HomePage';
import GameDetail from './page/GameDetailPage/GameDetail';
import GamesPage from './page/Games/GamesPage';
import logout from './page/Logout/Logout';
import MyAccount from './page/MyAccount/MyAccount';
import { tokenLoader } from './util/auth';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      loader: tokenLoader,
      id: 'root',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/game/:gameId',
          element: <GameDetail />,
        },
        { path: '/games', element: <GamesPage /> },
        { path: '/account', element: <MyAccount /> },
        {
          path: '/logout',
          action: logout,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
