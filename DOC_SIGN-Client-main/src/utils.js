import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: 'top-center',
    autoClose: 3000,
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: 'top-center',
    autoClose: 3000,
  });
};
