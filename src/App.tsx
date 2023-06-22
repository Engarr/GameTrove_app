import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './page/RootLayout/RootLayout';

const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <RootLayout />, id: 'root', children: [] },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
