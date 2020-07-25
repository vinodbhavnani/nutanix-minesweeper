/* eslint-disable prettier/prettier */
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';

import game from './containers/GamePage/reducers';

// Action definition
export function createAction(type, payload = {}) {
  return { type, ...payload };
}

export function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    game,
    ...injectedReducers,
  });

  return rootReducer;
}
