import { NextFunction, Request, Response } from "express";
import {
  getFlashMessagePr,
  setFlashMessagePr,
} from "./promise-flash-functions";
import { Config } from "./interfaces/interfaces";

/**
 * use this function to initialize promise base of async-connect-flash after setting the session middleware
 * @param config this is the configuration of flashconnect
 * @returns a middleware
 */
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
