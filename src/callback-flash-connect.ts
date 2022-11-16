import { NextFunction, Request, Response } from "express";
import {
  getFlashMessageCb,
  setFlashMessageCb,
} from "./callback-flash-functions";
import { Config, SetFlashCallbackFunction } from "./interfaces/interfaces";
import { FlashData } from "./types/types";

declare module "express-serve-static-core" {
  interface Request {
    setFlash?(
      key: string,
      value: FlashData,
      callback: SetFlashCallbackFunction
    ): void;

    getFlash?(key: string, callback: SetFlashCallbackFunction): void;
  }
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

    req.setFlash = (key, value, callback) => {
      setFlashMessageCb(req, key, value, callback, config);
    };

    req.getFlash = (key, callback) => {
      getFlashMessageCb(req, key, callback, config);
    };

    next();
  };
};

export default flashConnectCallback;
