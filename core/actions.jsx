import React from 'react';
import ReactDOM from 'react-dom';
import { C, E, helpers, _ } from './core';
import fetch from 'isomorphic-fetch';


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

function startSearchRequest (locationInfo) {
  return {
    type: E.SEARCH_REQUEST_STARTED,
    lat: locationInfo.lat,
    lng: locationInfo.lng,
    location: locationInfo.location,
    bounds: locationInfo.bounds
  };
}

function searchRequestComplete () {
  return { type: E.SEARCH_REQUEST_ENDED };
}


function search (searchSettings, locationInfo) {
  return function (dispatch) {
    dispatch(startSearchRequest(locationInfo));

    var searchParams = {
      lat: locationInfo.lat,
      lng: locationInfo.lng,
      limitByObservationRecency: searchSettings.limitByObservationRecency,
      observationRecency: searchSettings.observationRecency
    };

    // holy good lord. This monstrosity makes a request for the hotspots, converts the results to JSON (which is async
    // for some reason...?) then publishes the appropriate action
    return fetchBirdSightings(searchParams)
      .then(res => res.json())
      .then(
        json  => dispatch(searchLocationsFound(dispatch, json),
        error => dispatch(searchLocationRequestError(dispatch, error))
      )
    );
  }
}

function searchLocationsFound (dispatch, locations) {
  dispatch(searchRequestComplete());
  return {
    type: E.SEARCH_LOCATIONS_RETURNED,
    success: true,
    locations
  };
}

function searchLocationRequestError (dispatch, error) {
  dispatch(searchRequestComplete());
  return {
    type: E.SEARCH_LOCATIONS_RETURNED,
    success: false,
    error: error
  };
}

function fetchBirdSightings (searchParams) {
  var formData = new FormData();
  _.each(searchParams, function (val, key) {
    formData.append(key, val);
  });
  return fetch('/birdsearch.org/ajax/getHotspotLocations.php', {
    method: 'POST',
    body: formData
  });
}

function setIntroOverlayVisibility (visible) {
  return {
    type: E.SET_INTRO_OVERLAY_VISIBILITY,
    visible
  };
}

function requestingUserLocation () {
  return { type: E.REQUESTING_USER_LOCATION };
}

function requestGeoLocation () {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(function (position) {
      convertLatLngToAddress(dispatch, position.coords.latitude, position.coords.longitude);
    });
  };
}

function convertLatLngToAddress (dispatch, lat, lng) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: { lat: lat, lng: lng }}, function (results, status) {
    var userLocationFound = false;
    var address = '';
    var bounds = null;
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        userLocationFound = true;
        address = results[1].formatted_address;
        bounds = helpers.getBestBounds(results[1].geometry.viewport, results[1].geometry.bounds);
      }
    }
    dispatch({
      type: E.RECEIVED_USER_LOCATION,
      userLocationFound: userLocationFound,
      lat: lat,
      lng: lng,
      address: address,
      bounds: bounds
    });
  });
}


function getGeoLocation () {
  return function (dispatch) {
    dispatch(requestingUserLocation());
    return dispatch(requestGeoLocation());
  }
}

function togglePanelVisibility (panel) {
  return {
    type: E.TOGGLE_PANEL_VISIBILITY,
    panel: panel
  };
}

function updateVisibleLocations (locations, allLocationSightings) {
  return function (dispatch) {
    getBirdHotspotObservations (dispatch, locations, allLocationSightings);
    return {
      type: E.VISIBLE_LOCATIONS_UPDATED,
      locations: locations
    };
  }
}

function getBirdHotspotObservations (dispatch, locations, allLocationSightings) {
  var hasAtLeastOneRequest = false;

  locations.forEach(function (locInfo) {
    var currLocationId = locInfo.i;

    // if we already have the hotspot data available, just update the sidebar table
    if (allLocationSightings[currLocationID].sightings.fetched) {
//      _updateVisibleLocationInfo(currLocationID, _birdSearchHotspots[currLocationID].sightings.data[_lastSearchObsRecency-1].numSpeciesRunningTotal);
    } else {
      fetchSingleHotspotSightings(currLocationID).then(

      );
      hasAtLeastOneRequest = true;
    }
  });

  /*
  for (var i=0; i<_numVisibleLocations; i++) {
    var currLocationID = _visibleLocations[i].locationID;

    // check allHotspots to see if this data has been loaded yet. If not, prep the object. To minimize server requests,
    // we categorize all sightings into an array, where the index-1 === the day. That way, when the user changes the
    // range to show it's easy to extract the appropriate data
    if (!_birdSearchHotspots[currLocationID].hasOwnProperty("sightings")) {
      _birdSearchHotspots[currLocationID].isDisplayed = false;
      _birdSearchHotspots[currLocationID].sightings = {
        success: null,
        data: $.extend(true, [], _sightingsArray)
      };
    }

    // if we already have the hotspot data available, just update the sidebar table
    if (_birdSearchHotspots[currLocationID].sightings.data[_lastSearchObsRecency-1].available) {
      _updateVisibleLocationInfo(currLocationID, _birdSearchHotspots[currLocationID].sightings.data[_lastSearchObsRecency-1].numSpeciesRunningTotal);
    } else {
      _getSingleHotspotObservations(currLocationID);
      hasAtLeastOneRequest = true;
    }
  }

  // if we didn't just put through a new request, the user just searched a subset of what's already been loaded
  if (!hasAtLeastOneRequest) {
    _sortTable("#sidebarResultsTable");
    helper.stopLoading();

    var locations = _getVisibleLocationData();
    mediator.publish(_MODULE_ID, C.EVENT.BIRD_SIGHTINGS_LOADED, {
      birdData: locations,
      observationRecency: _lastSearchObsRecency
    });
  }
  */

}

var fetchSingleHotspotObservations = function (locationID) {
  var formData = new FormData();
  formData.append('locationID', locationID);
  formData.append('recency', 30);

  return fetch('/birdsearch.org/ajax/getHotspotSightings.php', {
    method: 'POST',
    body: formData
  });


  //$.ajax({
  //  url: "ajax/getHotspotSightings.php",
  //  data: {
  //    locationID: locationID,
  //    recency: _lastSearchObsRecency
  //  },
  //  type: "POST",
  //  dataType: "json",
  //  success: function(response) {
  //    _onSuccessReturnLocationObservations(locationID, response);
  //  },
  //  error: function(response) {
  //    _onErrorReturnLocationObservations(locationID, response);
  //  }
  //});
};


var _onSuccessReturnLocationObservations = function (locationID, response) {

  // this can be replaced by some reducer code...
  _birdSearchHotspots[locationID].isDisplayed = true;
  _birdSearchHotspots[locationID].sightings.success = true;


  
  // by reference, of course
  var sightingsData = _birdSearchHotspots[locationID].sightings.data;

  // mark the information as now available for this observation recency + and anything below,
  // and reset the observation data (it's about to be updated below)
  for (var i=0; i<C.SETTINGS.NUM_SEARCH_DAYS; i++) {
    if (i <= _lastSearchObsRecency) {
      sightingsData[i] = { available: true, obs: [], numSpecies: 0, numSpeciesRunningTotal: 0 };
    } else {
      sightingsData[i] = { available: false, obs: [], numSpecies: 0, numSpeciesRunningTotal: 0 };
    }
  }

  // now for the exciting part: loop through the observations and put them in the appropriate spot
  // in the data structure
  var speciesCount = response.length;
  for (var i=0; i<speciesCount; i++) {
    var observationTime = parseInt(moment(response[i].obsDt, "YYYY-MM-DD HH:mm").format("X"), 10);
    var difference = _CURRENT_SERVER_TIME - observationTime;
    var daysAgo = Math.ceil(difference / _ONE_DAY_IN_SECONDS); // between 1 and 30

    // sometimes users seem to be able to input future-dated observations (presumably by screwing up AM + PM)
    // so daysAgo can, actually be zero. This prevents that edge case
    var daysAgo = (daysAgo < 1) ? 1 : daysAgo;
    sightingsData[daysAgo-1].obs.push(response[i]);
  }

  // we've added all the observation data, set the numSpecies counts
  for (var i=0; i<sightingsData.length; i++) {
    sightingsData[i].numSpecies = sightingsData[i].obs.length;
  }

  // now set the numSpeciesRunningTotal property. This is the running total seen in that time
  // range: e.g. 3 days would include the total species seen on days 1-3, 4 days would have 1-4 etc.
  var uniqueSpecies = {};
  var numUniqueSpecies = 0;
  for (var i=0; i<C.SETTINGS.NUM_SEARCH_DAYS; i++) {
    var currDaySightings = _birdSearchHotspots[locationID].sightings.data[i];
    for (var j=0; j<currDaySightings.obs.length; j++) {
      if (!uniqueSpecies.hasOwnProperty(currDaySightings.obs[j].sciName)) {
        uniqueSpecies[currDaySightings.obs[j].sciName] = null;
        numUniqueSpecies++;
      }
    }
    _birdSearchHotspots[locationID].sightings.data[i].numSpeciesRunningTotal = numUniqueSpecies;
  }

  _updateVisibleLocationInfo(locationID, response.length);

  if (_checkAllObservationsLoaded()) {
    _sortTable("#sidebarResultsTable");
    helper.stopLoading();

    // get the subset of locations currently on the map
    var locations = _getVisibleLocationData();

    mediator.publish(_MODULE_ID, C.EVENT.BIRD_SIGHTINGS_LOADED, {
      birdData: locations, // _birdSearchHotspots,
      observationRecency: _lastSearchObsRecency
    });
  }
};


export {
  setLocale,
  setSearchLocation,
  search,
  setIntroOverlayVisibility,
  getGeoLocation,
  togglePanelVisibility,
  updateVisibleLocations
};
