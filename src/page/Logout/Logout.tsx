import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';

function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  toast.success('You have successfully logout');
  return redirect('/');
}

export default action;
