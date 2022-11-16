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

export { SetFlashCallbackFunction, GetFlashCallbackFunction, Config };
