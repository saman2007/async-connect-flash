import { NextFunction, Request, Response } from "express";
import {
  getFlashMessagePr,
  setFlashMessagePr,
} from "./promise-flash-functions";
import { Config } from "./interfaces/interfaces";

const flashConnectPromise = (config: Config = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const flashStore = config.storeProperty || "flash";
    if (!req.session[flashStore]) req.session[flashStore] = {};

    if (!req.session)
      throw new Error("your should install express-session library!");

    req.setFlash = (key, value) => {
      return setFlashMessagePr(req, key, value, config);
    };

    req.getFlash = (key) => {
      return getFlashMessagePr(req, key, config);
    };

    next();
  };
};

export default flashConnectPromise;
