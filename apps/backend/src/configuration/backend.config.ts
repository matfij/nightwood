/**
 * General
 */
export const EXPEDITION_TIME_SCALE = 1 / 1;
export const FEED_TIME_SCALE = 1 / 1;
export const ALCHEMY_TIME_SCALE = 1 / 1;
export const GUILD_RESOURCES_GAIN = 1;
export const ETER_CONVERTER_SCALE = 1;

export const PAGINATION_DEFAULT_PAGE = 0;
export const PAGINATION_DEFAULT_LIMIT = 100;

/**
 * Users
 */
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 30;
export const NICKNAME_MIN_LENGTH = 4;
export const NICKNAME_MAX_LENGTH = 16;
export const AVATAR_MAX_SIZE = 200 * 1000;  // 200 kB

/**
 * Messages
 */
export const CHAT_MESSAGE_MIN_LENGTH = 1;
export const CHAT_MESSAGE_MAX_LENGTH = 500;

/**
 * Mails
 */
export const MAIL_SYSTEM_SENDER = 'SYSTEM';
export const MAIL_RECEIVER_MIN_LENGTH = 4;
export const MAIL_RECEIVER_MAX_LENGTH = 12;
export const MAIL_TOPIC_MIN_LENGTH = 1;
export const MAIL_TOPIC_MAX_LENGTH = 100;
export const MAIL_MESSAGE_MIN_LENGTH = 3;
export const MAIL_MESSAGE_MAX_LENGTH = 1000;
export const MAIL_OUT_OF_DATE_DAYS = 30;

/**
 * Penalties
 */
export const MUTE_MIN_TIME = 1;
export const MUTE_MAX_TIME = 200;
export const BAN_MIN_TIME = 1;
export const BAN_MAX_TIME = 1000;
export const PENALTY_COMMENT_MAX_LENGTH = 1000;

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
export const MAX_AUCTION_TIME = 336;
export const MIN_AUCTION_PRICE = 10;
export const MAX_AUCTION_PRICE = 1000000;
export const MIN_AUCTION_QUANTITY = 1;
export const MAX_AUCTION_QUANTITY = 1000;
export const AUCTION_OUT_OF_DATE_DAYS = 30;

/**
 * Guilds
 */
export const GUILD_COST = 10_000;
export const GUILD_NAME_MIN_LENGT = 4;
export const GUILD_NAME_MAX_LENGT = 20;
export const GUILD_TAG_MIN_LENGT = 2;
export const GUILD_TAG_MAX_LENGT = 4;
export const GUILD_DESCRIPTION_MAX_LENGT = 1000;
export const GUILD_APPLICATION_MESSAGE_MAX_LENGTH = 200;
export const GUILD_ROLE_NAME_MIN_LENGTH = 4;
export const GUILD_ROLE_NAME_MAX_LENGTH = 16;
export const GUILD_ROLE_PRIORITY_MIN = 1;
export const GUILD_ROLE_PRIORITY_MAX = 100;
export const GUILD_MIN_DEPOSIT_AMOUNT = 0;
export const GUILD_MAX_DEPOSIT_AMOUNT = 1000000;
export const GUILD_RESOURCE_LIMIT = 1000000;
