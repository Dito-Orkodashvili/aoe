import { ActionErrorCode } from "../utils/error.constants";

export type ActionErrorCodeType =
  (typeof ActionErrorCode)[keyof typeof ActionErrorCode];

export type ActionResultType<T = void> =
  | { ok: true; data?: T }
  | {
      ok: false;
      error: {
        code: ActionErrorCodeType;
        message?: string;
      };
    };
