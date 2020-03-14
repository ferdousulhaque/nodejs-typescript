import { Request, Response } from "express";
import { queueController } from "../controllers/QueueController";
import { notificationController } from "../controllers/NotificationController";
import { checkSearchParams } from "../middleware/checks";
import { whiteListIpToApi } from "../middleware/whiteListIp";

export default [
  {
    path: "/test",
    method: "get",
    handler: [
      whiteListIpToApi,
      //checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        queueController.create(query,res)
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
        queueController.send(query,res)
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
        queueController.receive(query,res)
      }
    ]
  },
  {
    path: "/notification",
    method: "get",
    handler: [
      //checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        //const result = await getPlacesByName(query.q);
        notificationController.sendNotification(query, res);
      }
    ]
  }
];