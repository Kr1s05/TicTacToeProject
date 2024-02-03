import client from "./axiosClient";

const getRooms = async (): Promise<[{ roomId: string; roomName: string }]> => {
  return client
    .get("/rooms")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return { message: err };
    });
};

export { getRooms };
