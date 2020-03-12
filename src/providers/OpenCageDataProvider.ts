import request from "request-promise";
import dotenv from "dotenv";

dotenv.config();

export const getPlaces = async (query: string) => {
  const key = process.env.OPEN_CAGE_DATA_KEY;
  const url = `http://dummy.restapiexample.com/api/v1/employees`;
  const response = await request(url);
  return JSON.parse(response);

};