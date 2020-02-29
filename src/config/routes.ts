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
  }
];