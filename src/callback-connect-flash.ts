import { NextFunction, Request, Response } from "express";
import {
  getFlashMessageCb,
  setFlashMessageCb,
} from "./callback-connect-flash-functions";
import { Config, GetFlash, SetFlash } from "./interfaces/interfaces";

declare module "express-serve-static-core" {
  interface Request extends SetFlash, GetFlash {}
}

/**
 * use this function to initialize callback version of async-flash-connect after setting the session middleware
 * @param config the configuration object of flashconnect
 * @returns a middleware
 */
const flashConnectCallback = (config: Config = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const flashStore = config.storeProperty || "flash";

    if (!req.session[flashStore]) req.session[flashStore] = {};

    if (!req.session)
      throw new Error("your should install express-session library!");

    if (!req.setFlash || !req.getFlash) {
      req.setFlash = (key, value, callback) => {
        setFlashMessageCb(req, key, value, callback, config);
      };

      req.getFlash = (key, callback) => {
        getFlashMessageCb(req, key, callback, config);
      };
    }

    next();
  };
};

export default flashConnectCallback;
