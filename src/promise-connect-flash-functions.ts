import { Request } from "express";
import { Config } from "./interfaces/interfaces";
import { FlashData } from "./types/types";

/**
 * getFlashMessagePr
 * * this is a promise base function
 * * when this function runs, it will return a promise and *delete* your flash message in the session
 * @param req req param is the Request object that you use inside an express middleware
 * @param key key param is actually the title of your flash message
 * @returns a promise
 */
const getFlashMessagePr = (req: Request, key: string, config: Config) => {
  const storeProperty = config.storeProperty || "flash";

  return new Promise((resolve, reject) => {
    if (req.session[storeProperty][key]) {
      const msg: FlashData = req.session[storeProperty][key];
      delete req.session[storeProperty][key];
      req.session.save((err) => {
        if (err) reject(err);
        else resolve(msg);
      });
    } else {
      resolve(null);
    }
  });
};

/**
 * setFlashMessagePr
 * * this is a promise base function
 * * when this function runs, it will return a promise and *delete* your flash message in the session
 * @param req req param is the Request object that you use inside an express middleware
 * @param key key param is actually the title of your flash message
 * @param value value param is the datas that you want to store as a flash message. this should be a string or an array of strings
 * @returns a promise
 */
const setFlashMessagePr = (
  req: Request,
  key: string,
  value: FlashData,
  config: Config
) => {
  const storeProperty = config.storeProperty || "flash";
  let flashDatas = req.session[storeProperty][key];
  const isValuArray = Array.isArray(value);
  const isSessionDataArray = Array.isArray(flashDatas);

  if (!flashDatas) {
    flashDatas = value;
  } else {
    if (isSessionDataArray) {
      if (isValuArray) flashDatas = [...flashDatas, ...value];
      else flashDatas = [...flashDatas, value];
    } else {
      if (isValuArray) flashDatas = [flashDatas, ...value];
      else flashDatas = [flashDatas, value];
    }
  }

  req.session[storeProperty][key] = flashDatas;

  return new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) reject(err);
      else resolve(null);
    });
  });
};

export { getFlashMessagePr, setFlashMessagePr };
