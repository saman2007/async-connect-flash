import { Request } from "express";
import {
  Config,
  GetFlashCallbackFunction,
  SetFlashCallbackFunction,
} from "./interfaces/interfaces";
import { FlashData } from "./types/types";

/**
 * getFlashMessageCb
 * * this is a callback base function
 * * when this function runs, it will return and *delete* your flash message from the session
 * @param req req param is the Request object that you use inside an express middleware
 * @param key key param is actually the title of your flash message
 * @param callback this should be a function that will be called when the chanages saved in the session
 * @param config this is the configuration of flashconnect
 */
const getFlashMessageCb = (
  req: Request,
  key: string,
  callback: GetFlashCallbackFunction,
  config: Config
) => {
  const storeProperty = config.storeProperty || "flash";

  if (!req.session[storeProperty]) req.session[storeProperty] = {};

  if (req.session[storeProperty][key]) {
    const msg: FlashData = req.session[storeProperty][key];
    delete req.session[storeProperty][key];
    req.session.save((err) => {
      callback(err, msg);
    });
  } else {
    callback(null, null);
  }
};

/**
 * setFlashMessageCb
 * * this is a callback base function
 * @param req req param is the Request object that you use inside an express middleware
 * @param key key param is actually the title of your flash message
 * @param value value param is the datas that you want to store as a flash message. this should be a string or an array of strings
 * @param callback this should be a function that will be called when the chanages saved in the session
 * @param config this is the configuration of flashconnect
 */
const setFlashMessageCb = (
  req: Request,
  key: string,
  value: FlashData,
  callback: SetFlashCallbackFunction,
  config: Config
) => {
  const storeProperty = config.storeProperty || "flash";

  if (!req.session[storeProperty]) req.session[storeProperty] = {};

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

  req.session.save(callback);
};

export { getFlashMessageCb, setFlashMessageCb };
