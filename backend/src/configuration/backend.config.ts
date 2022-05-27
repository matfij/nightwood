/**
 * General
 */

export const EXPEDITION_TIME_SCALE = 1 / 2;
export const FEED_TIME_SCALE = 1;
export const ALCHEMY_TIME_SCALE = 1 / 1;

export const PAGINATION_DEFAULT_PAGE = 0;
export const PAGINATION_DEFAULT_LIMIT = 100;

/**
 * Users
 */

export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 30;
export const NICKNAME_MIN_LENGTH = 4;
export const NICKNAME_MAX_LENGTH = 16;

/**
 * Messages
 */

export const CHAT_MESSAGE_MIN_LENGTH = 1;
export const CHAT_MESSAGE_MAX_LENGTH = 500;

export const MAIL_RECEIVER_MIN_LENGTH = 4;
export const MAIL_RECEIVER_MAX_LENGTH = 12;
export const MAIL_TOPIC_MIN_LENGTH = 1;
export const MAIL_TOPIC_MAX_LENGTH = 100;
export const MAIL_MESSAGE_MIN_LENGTH = 3;
export const MAIL_MESSAGE_MAX_LENGTH = 1000;

/**
 * Dragons
 */

export const FEED_INTERVAL = FEED_TIME_SCALE * 1000 * 60 * 60 * 12;
export const RESTORE_STAMINA_INTERVAL = FEED_TIME_SCALE * 1000 * 60 * 60 * 12;
export const FOOD_STAMINA_GAIN = 50;
export const RESTORE_STAMINA_GAIN = 50;

export const SKILL_DEVELOPMENT_LIMIT = 25;
export const MAX_RUNES = 3;

/**
 * Items
 */

export const MIN_AUCTION_TIME = 1;
export const MAX_AUCTION_TIME = 72;
export const MIN_AUCTION_PRICE = 10;
export const MAX_AUCTION_PRICE = 1000000;
export const MIN_AUCTION_QUANTITY = 1;
export const MAX_AUCTION_QUANTITY = 1000;
