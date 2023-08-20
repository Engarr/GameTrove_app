import { useRouteLoaderData } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import UserPage from '../UserPage/UserPage';

const MyAccount = () => {
  const token = useRouteLoaderData('root');
  let content;

  if (!token) {
    content = <AuthForm />;
  } else {
    content = <UserPage />;
  }

  return <div>{content}</div>;
};

export default MyAccount;
