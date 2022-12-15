/**
 * General
 */
export const APP_NAME = 'Nightwood';
export const API_VERSION = 'v1';

/**
 * Rate limiting
 */
export const APP_REQUEST_TTL = 30;  // seconds
export const APP_REQUEST_LIMIT = 40;
export const AUTH_REQUEST_TTL = 10;  // seconds
export const AUTH_REQUEST_LIMIT = 2;
export const WS_REQUEST_TTL = 10;  // seconds
export const WS_REQUEST_LIMIT = 3;

/**
 * JWT
 */
export const JWT_VALIDITY = 24 * 3600;  // seconds
export const JWT_REFRESH_VALIDITY = 48 * 3600;  // seconds

/**
 * Database & typeorm
 */
export const DB_TIMESTAMP_TYPE = 'int8';
export const DB_MONEY_TYPE = 'decimal';

/**
 * Local files
 */
export const AVATARS_PATH = 'uploads/avatars';

/**
 * Localization
 */
export const DEFAULT_LANG = 'en';

/**
 * Dates
 */
export const DATE_FORMAT = 'yyyy-MM-DD[T]HH:mm:ssZZ';

/**
 * Swagger
 */
export const SWAGGER_URL = 'swagger';
export const SCHEMA_FILE = './schema.json';
