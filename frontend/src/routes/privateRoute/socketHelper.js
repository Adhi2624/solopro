import { io } from "socket.io-client";
import { BASE_URL } from "../config";
import { getItemWithExpiry } from "./localStorageWithExpiry";

export let socket;

export const initiateSocketConnection = () => {
  const user = getItemWithExpiry("user");

  socket = io(BASE_URL, {
    auth: {
      token: user && user.token,
    },
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
