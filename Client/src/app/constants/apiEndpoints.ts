import { isDevMode } from '@angular/core';

const SERVER_BASE_URL_DEVELOPMENT = 'https://localhost:7030';
const SERVER_BASE_URL_PRODUCTION = 'https://aspnetcorereacttutorial-aspnetserver.azurewebsites.net';

const BASE_ENDPOINTS = {
  GET_ALL_CARDS: 'cards',
  GET_CARD_BY_ID: 'cards',
  CREATE_CARD: 'cards',
  UPDATE_CARD: 'cards',
  DELETE_CARD: 'cards',
  GET_ALL_LISTS: 'lists',
  GET_LIST_BY_ID: 'lists',
  CREATE_LIST: 'lists',
  UPDATE_LIST: 'lists',
  DELETE_LIST: 'lists'
};

const DEVELOPMENT_ENDPOINTS = {
    GET_ALL_CARDS: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_ALL_CARDS}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.GET_CARD_BY_ID}/1\`
  */
  GET_CARD_BY_ID: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_CARD_BY_ID}`,
  /**
  * Send the post to create as an object of type CardDTO in the HTTP body.
  */
  CREATE_CARD: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.CREATE_CARD}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.UPDATE_CARD}/1\`.
  * Send the post to update as an object of type CardDTO in the HTTP body.
  */
  UPDATE_CARD: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.UPDATE_CARD}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.DELETE_CARD}/1\`
  */
  DELETE_CARD: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.DELETE_CARD}`,
  GET_ALL_LISTS: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_ALL_LISTS}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.GET_LIST_BY_ID}/1\`
  */
  GET_LIST_BY_ID: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_LIST_BY_ID}`,
  /**
  * Send the post to create as an object of type CardsListDTO in the HTTP body.
  */
  CREATE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.CREATE_LIST}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.UPDATE_LIST}/1\`.
  * Send the post to update as an object of type CardsListDTO in the HTTP body.
  */
  UPDATE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.UPDATE_LIST}`,
  /**
  * Append /{id}. Example: \`${API_ENDPOINTS.DELETE_List}/1\`
  */
  DELETE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.DELETE_LIST}`
};

const PRODUCTION_ENDPOINTS = {
    GET_ALL_CARDS: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.GET_ALL_CARDS}`,
  GET_CARD_BY_ID: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.GET_CARD_BY_ID}`,
  CREATE_CARD: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.CREATE_CARD}`,
  UPDATE_CARD: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.UPDATE_CARD}`,
  DELETE_CARD: `${SERVER_BASE_URL_PRODUCTION}/${BASE_ENDPOINTS.DELETE_CARD}`,
  GET_ALL_LISTS: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_ALL_LISTS}`,
  GET_LIST_BY_ID: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.GET_LIST_BY_ID}`,
  CREATE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.CREATE_LIST}`,
  UPDATE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.UPDATE_LIST}`,
  DELETE_LIST: `${SERVER_BASE_URL_DEVELOPMENT}/${BASE_ENDPOINTS.DELETE_LIST}`
};

const ENDPOINTS_TO_EXPORT = isDevMode() ? DEVELOPMENT_ENDPOINTS : PRODUCTION_ENDPOINTS;

export default ENDPOINTS_TO_EXPORT;