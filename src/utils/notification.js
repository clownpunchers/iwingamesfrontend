import { NotificationManager } from "react-notifications";

export const Notify = (type, message) => {
  switch (type) {
    case "info":
      NotificationManager.info(message);
      break;
    case "success":
      NotificationManager.success(message, "Success");
      break;
    case "warning":
      NotificationManager.warning(message, "Warning", 3000);
      break;
    case "error":
      NotificationManager.error(message, "Error", 5000, () => {
        
      });
      break;
    default:
      break;
  }
};
