import React from 'react';
import ReactDOM from 'react-dom';
import { C, E } from './core';


function setLocale (locale) {
  return {
    type: E.SET_LOCALE,
    locale
  };
}

function setSearchLocation (location) {
  return {
    type: E.SET_SEARCH_LOCATION,
    location
  };
}

function searchRequest (searchSettings) {
  return {
    type: E.SEARCH_REQUEST_STARTED,
    lat: searchSettings.lat,
    lng: searchSettings.lng
  };
}

function search (searchSettings) {
  return function (dispatch) {
    dispatch(searchRequest(searchSettings));

    return dispatch(function () {

    });
  }
}


export {
  setLocale,
  setSearchLocation,
  search
};