import { getPlaces } from "../providers/OpenCageDataProvider";
import { Request, Response } from 'express';

class SearchController {
  public create(req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response): void {
      //throw new Error("Method not implemented.");
      // res.status(200).send({
      //   test: 'success'
      // });
      getPlaces('berlin').then(data => {
        res.status(200).send({
          test: data
        });
      })
  }
}

const searchController = new SearchController();

export {
  searchController
};