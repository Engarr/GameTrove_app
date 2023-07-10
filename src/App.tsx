import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './page/RootLayout/RootLayout';
import Home from './page/HomePage/HomePage';
import GameDetail from './page/GameDetailPage/GameDetail';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: '/game/:gameId', element: <GameDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
