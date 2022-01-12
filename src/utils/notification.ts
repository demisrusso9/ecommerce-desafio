import { toast, ToastOptions } from 'react-toastify'

export const notify = (action: string, text: string) => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 1700,
    closeOnClick: true,
    hideProgressBar: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false
  }

  return action === 'warn'
    ? toast.warn(text, options)
    : toast.info(text, options)
}
