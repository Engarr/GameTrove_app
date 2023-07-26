import AuthForm from '../../components/AuthForm/AuthForm';

const MyAccount = () => {
  let content;

  // eslint-disable-next-line prefer-const
  content = <AuthForm />;

  return <div>{content}</div>;
};

export default MyAccount;
