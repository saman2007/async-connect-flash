import { FlashData } from "../types/types";

interface GetFlashCallbackFunction {
  (error: any, datas: FlashData): void;
}

interface SetFlashCallbackFunction {
  (error: any): void;
}

interface Config {
  storeProperty?: string;
}

interface SetFlash {
  setFlash(
    key: string,
    value: FlashData,
    callback?: SetFlashCallbackFunction
  ): void | Promise<unknown>;
}

interface GetFlash {
  getFlash(
    key: string,
    callback?: GetFlashCallbackFunction
  ): void | Promise<unknown>;
}

export {
  SetFlashCallbackFunction,
  GetFlashCallbackFunction,
  Config,
  SetFlash,
  GetFlash,
};
