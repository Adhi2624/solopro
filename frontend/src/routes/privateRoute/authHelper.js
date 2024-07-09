import { initiateSocketConnection, disconnectSocket } from "./socketHelper";
import { setItemWithExpiry, getItemWithExpiry } from "./localStorageWithExpiry";

export const isLoggedIn = () => {
  return getItemWithExpiry("user");
};

export const loginUser = (user) => {
  setItemWithExpiry("user", user, 3600000); // e.g., 1 hour TTL
  initiateSocketConnection();
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  disconnectSocket();
};
