import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export const showNotification = (title, message, type) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 1500,
      timingFunction: 'ease-out'
    }
  });
};