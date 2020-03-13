import { Request, Response } from "express";
import { searchController } from "../controllers/SearchController";
import { checkSearchParams } from "../middleware/checks";

export default [
  {
    path: "/test",
    method: "get",
    handler: [
      //checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        searchController.create(query,res)
      }
    ]
  },
  {
    path: "/send",
    method: "get",
    handler: [
      //checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        searchController.send(query,res)
      }
    ]
  },
  {
    path: "/receive",
    method: "get",
    handler: [
      //checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        searchController.receive(query,res)
      }
    ]
  }
];