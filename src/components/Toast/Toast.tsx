import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          className: '',
          duration: 3000,

          style: {
            background: 'rgb(255,255,255)',
            color: 'rgb(0,0,0)',
            padding: '16px',
            border: '2px solid rgb(138, 224, 10)',
            fontFamily: 'Bai Jamjuree, sans-serif',
            textAlign: 'center',
          },
          success: {
            iconTheme: {
              primary: 'rgb(138, 224, 10)',
              secondary: 'rgb(255,255,255)',
            },
          },
        }}
      />
    </div>
  );
};

export default Toast;
