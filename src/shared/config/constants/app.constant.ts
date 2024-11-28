import { Environment, LogLevel, NodeEnv } from '../models/enums/app.enum';

export const nodeEnvValues: [string, string] = [
  NodeEnv.DEVELOPMENT,
  NodeEnv.PRODUCTION,
];

export const environmentValues: [string, string, string, string] = [
  Environment.LOCAL,
  Environment.QA,
  Environment.STG,
  Environment.PRD,
];

export const logLevelValues: [string, string, string, string, string, string] =
  [
    LogLevel.TRACE,
    LogLevel.DEBUG,
    LogLevel.INFO,
    LogLevel.WARN,
    LogLevel.ERROR,
    LogLevel.FATAL,
  ];

export const APP_NAME_DEFAULT = 'ms-order-kenility-challenge';
export const HTTP_PORT_DEFAULT = 3000;
export const LOGGER_MESSAGE_KEY_DEFAULT = 'msg';
export const LOGGER_TARGET = 'pino-pretty';

export const IS_PUBLIC_API = 'isPublicAPI';
export const GLOBAL_API_VERSION = 'v1';
