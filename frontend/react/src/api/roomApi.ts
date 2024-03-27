import client from "./axiosClient";

const getRooms = async (): Promise<Array<roomData>> => {
  return client
    .get("/rooms")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export type roomData = {
  id: string;
  player: string;
  name: string;
};

export { getRooms };
