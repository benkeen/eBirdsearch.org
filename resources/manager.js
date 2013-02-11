/*jslint browser:true*/
/*global $:false,map:false,console:false,moment:false*/
'use strict';

var manager = {

	// hotspots contains ALL the data, grouped by hotspots
	hotspots: null,
	numHotspots: null,
	species: {},
	numSpecies: 0,

	regionType: null,
	region: null,
	observationRecency: null,

	searchField: null,

	activeHotspotRequest: false,
	maxNumHotspots: 50,

	currTabID: 'mapTab',


	init: function() {
		$(window).resize(manager.handleWindowResize);

		manager.handleWindowResize();

		// add the appropriate event handlers to detect when the seach settings have changed
		manager.addEventHandlers();

		// make a note of some important DOM elements
		manager.searchField = $('#searchTextField')[0];

		// set the default values
		manager.observationRecency = $('#observationRecency').val();

		// initialize the map
		map.initialize();

		// focus!
		$(manager.searchField).focus();
	},

	// not the prettiest thing ever, but since flexbox isn't implemented in all browsers yet...
	handleWindowResize: function() {
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		$('#sidebar').css('height', windowHeight - 42);
		$('#mainPanel').css({
			height: windowHeight - 76,
			width: windowWidth - 280
		});
		$('#searchResults').css('height', windowHeight - 102);
	},

	addEventHandlers: function() {
		$('#observationRecency').bind('change', manager.onChangeObservationRecency);
		$('#panelTabs').on('click', 'li', manager.selectTab);
		$('#searchResults').on('click', '.toggle', manager.toggleCheckedHotspots);
		$('#searchResults').on('click', 'tbody input', manager.toggleHotspot);
		$(document).on('click', '.viewLocationBirds', manager.displaySingleHotspotBirdSpecies);
	},

	onChangeObservationRecency: function(e) {
		manager.observationRecency = $(e.target).val();

		var address = $.trim(manager.searchField.value);
		if (address !== '') {
			manager.getHotspots();
		}
	},

	/**
	 * Gets called by map.js when the markers have been loaded onto the screen. This updates
	 * the sidebar and starts requesting the hotspot observation data.
	 */
	onDisplayHotspots: function(data) {
		manager.hotspots = data;
		manager.numHotspots = data.length;
		$('#numHotspotsFound span').html(manager.numHotspots);

		if (manager.numHotspots > 0) {
			var html = manager.generateHotspotTable(data);
			$('#searchResults').html(html).removeClass('hidden');

  			// now start requesting all the observation data for each hotspot
			manager.getAllHotspotObservations();
		} else {
			$('#searchResults').html('').removeClass('hidden');
			manager.stopLoading();
		}
	},

	/**
	 * Loop through all hotspots returned and fire off Ajax requests for each,
	 */
	getAllHotspotObservations: function() {
		for (var i=0; i<manager.numHotspots; i++) {
			manager.getSingleHotspotObservation(manager.hotspots[i].i);
		}
	},

	getSingleHotspotObservation: function(locationID) {
		$.ajax({
			url: "ajax/getHotspotObservations.php",
			data: {
				locationID: locationID,
				recency: manager.observationRecency
			},
			type: "POST",
			dataType: "json",
			success: function(response) {
				manager.onSuccessReturnObservations(locationID, response);
			},
			error: manager.onErrorReturnObservations
		});
	},

	onSuccessReturnObservations: function(locationID, response) {
		var hotspotIndex = manager.getHotspotLocationIndex(locationID);
		manager.hotspots[hotspotIndex].isDisplayed = true;
		manager.hotspots[hotspotIndex].observations = {
			success: true,
			data: response
		};

		$('#location_' + locationID + ' .notLoaded').removeClass('notLoaded').addClass('loaded');

		if (manager.checkAllObservationsLoaded()) {
			manager.stopLoading();
			manager.createSpeciesMap();
			manager.updateSpeciesTab();
		}
	},
	
	onErrorReturnObservations: function(locationID, response) {
		var hotspotIndex = manager.getHotspotLocationIndex(locationID);
		manager.hotspots[hotspotIndex].observations = {
			success: false
		};

		if (manager.checkAllObservationsLoaded()) {
			manager.stopLoading();
		}
	},

	getHotspotLocationIndex: function(locationID) {
		var index = null;
		for (var i=0; i<manager.numHotspots; i++) {
			if (manager.hotspots[i].i == locationID) {
				index = i;
				break;
			}
		}
		return index;
	},

	/**
	 * Called after any observations has been returned. It looks through all of data.hotspots
	 * and confirms every one has an observations property (they are added after a response - success
	 * or failure).
	 */
	checkAllObservationsLoaded: function() {
		var allLoaded = true;
		for (var i=0; i<manager.numHotspots; i++) {
			if (!manager.hotspots[i].hasOwnProperty('observations')) {
				allLoaded = false;
				break;
			}
		}
		return allLoaded;
	},

	getHotspots: function() {
		manager.activeHotspotRequest = true;
		manager.startLoading();
		$.ajax({
			url: "ajax/getHotspots.php",
			data: {
				regionType: manager.regionType,
				region: manager.region,
				recency: manager.observationRecency
			},
			type: "POST",
			dataType: "json",
			success: function(response) {
				map.displayHotspots(response);
			},
			error: function(response) {
				console.log("error: ", response);
			}
		});
	},

	startLoading: function() {
		$('#loadingSpinner').show();
	},

	stopLoading: function() {
		$('#loadingSpinner').hide();
	},

	createSpeciesMap: function() {
		manager.species = {};
		manager.numSpecies = 0;
		for (var i=0; i<manager.numHotspots; i++) {

			// if this hotspots observations failed to load (for whatever reason), just ignore the row
			if (!manager.hotspots[i].observations.success) {
				continue;
			}

			var numObservations = manager.hotspots[i].observations.data.length;
			for (var j=0; j<numObservations; j++) {
				var currData = manager.hotspots[i].observations.data[j];
				var sciName = currData.sciName;

				if (!manager.species.hasOwnProperty(sciName)) {
					manager.species[sciName] = {
						comName: currData.comName,
						sciName: currData.sciName,
						obs: []
					};
					manager.numSpecies++;
				}

				manager.species[sciName].obs.push({
					howMany: currData.howMany,
					lat: currData.lat,
					lng: currData.lng,
					locID: currData.locID,
					locName: currData.locName,
					obsDt: currData.obsDt,
					obsReviewed: currData.obsReviewed,
					obsValid: currData.obsValid
				});
			}
		}
	},

	selectTab: function(e) {
		var tab = e.target;
		if ($(tab).hasClass('disabled')) {
			return;
		}
		var tabID = $(tab).attr("id");
		if (tabID == manager.currTabID) {
			return;
		}

		$('#panelTabs li').removeClass('selected');
		$(tab).addClass('selected');
		$('#' + manager.currTabID + 'Content').addClass('hidden');
		$('#' + tabID + 'Content').removeClass('hidden');

		manager.currTabID = tabID;
	},


	toggleCheckedHotspots: function(e) {
		var isChecked = e.target.checked;
		if (isChecked) {
			$('#hotspotTable tbody input').each(function() {
				this.checked = true;
			});
		} else {
			$('#hotspotTable tbody input').removeAttr('checked');
		}

		// loop through all markers and enable/disable them
		for (var i in map.markers) {
			map.markers[i].setVisible(isChecked);
		}

		for (var locationID in manager.hotspots) {
			manager.hotspots[locationID].isDisplayed = isChecked;
		}

		manager.updateSpeciesTab();
	},

	toggleHotspot: function(e) {
		var row = $(e.target).closest('tr');
		var locationID = $(row).attr('id').replace(/location_/, '');
		var hotspotIndex = manager.getHotspotLocationIndex(locationID);

		var isChecked = e.target.checked;
		manager.hotspots[hotspotIndex].isDisplayed = isChecked;
		
		// now update the map and Bird Species tab
		map.markers[locationID].setVisible(isChecked);
		manager.updateSpeciesTab();
	},


	// ------------------------------------------

	// in a real app, the following would be templated

	generateHotspotTable: function(data) {
		var html = '<table class="tablesorter tablesorter-bootstrap table table-bordered table-striped" id="hotspotTable">' +
				'<thead>' +
				'<tr>' +
					'<th width="20" class="{ sorter: false }"><input type="checkbox" class="toggle" checked="checked" /></th>' +
					'<th>Location</th>' +
					'<th width="20" class="{ sorter: false }"></th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>';

		for (var i=0; i<data.length; i++) {
			html += '<tr id="location_' + data[i].i + '">' +
					'<td><input type="checkbox" name="hs[]" checked="checked" /></td>' +
					'<td>' + data[i].n + '</td>' +
					'<td class="loadingStatus notLoaded"><span></span></td>' +
					'</tr>';
		}
		html += '</tbody></table>';

		return html;
	},

	generateSpeciesTable: function() {
		var html = '<table class="tablesorter-bootstrap" cellpadding="2" cellspacing="0" id="speciesTable">' +
				'<thead>' +
				'<tr>' +
					'<th>Species Name</th>' +
					'<th>Scientific Name</th>' +
					'<th class="{ sorter: false }">Locations seen</th>' +
					'<th>Last seen</th>' +
					'<th>How many reported</th>' +
				'</tr>' +
				'</thead><tbody>';

		var speciesCount = 0;
		for (var i in manager.species) {
			var locations = [];
			var observationsInVisibleLocation = [];
			for (var j=0; j<manager.species[i].obs.length; j++) {
				var currLocationID = manager.species[i].obs[j].locID;
				var hotspotIndex = manager.getHotspotLocationIndex(currLocationID);
				locations.push(manager.species[i].obs[j].locName);

				if (!manager.hotspots[hotspotIndex].isDisplayed) {
					continue;
				}
				observationsInVisibleLocation.push(manager.species[i].obs[j]);
			}

			if (observationsInVisibleLocation.length === 0)  {
				continue;
			}

			var locationsHTML = locations.join('<br />');

			var howManyCount = null;
			for (var k=0; k<observationsInVisibleLocation.length; k++) {
				var howMany = observationsInVisibleLocation[k].howMany || "-";
				if (howMany.toString().match(/\D/g)) {
					howManyCount = "-";
					break;
				}
				howManyCount += parseInt(observationsInVisibleLocation[k].howMany, 10);
			}

			var lastSeen = null;
			for (var n=0; n<observationsInVisibleLocation.length; n++) {
				var unixtime = moment(observationsInVisibleLocation[n].obsDt, 'YYYY-MM-DD HH:mm');
				if (unixtime > lastSeen) {
					lastSeen = unixtime;
				}
			}

			var formattedDate = lastSeen.format('MMM Do, H:mm a');

			html += '<tr>' +
				'<td>' + manager.species[i].comName + '</td>' +
				'<td>' + manager.species[i].sciName + '</td>' +
				'<td>' + locationsHTML + '</td>' +
				'<td>' + formattedDate + '</td>' +
				'<td>' + howManyCount + '</td>' +
			'</tr>';

			speciesCount++;
		}
		html += '</tbody></table>';

		if (speciesCount === 0) {
			html = '<p>Yegads, no birds found!</p>';
		}

		manager.numVisibleSpecies = speciesCount;

		return html;
	},

	updateSpeciesTab: function() {
		try {
			$("#speciesTable").trigger("destroy");
		} catch (e) {

		}

		$('#birdSpeciesTable').html(manager.generateSpeciesTable());
		$('#birdSpeciesTab').removeClass('disabled').html('Bird Species (' + manager.numVisibleSpecies + ')');

		$("#speciesTable").tablesorter({
			theme: 'bootstrap',
			headerTemplate: '{content} {icon}',
			widgets: ['zebra','columns', 'uitheme']
		});
	},


	displaySingleHotspotBirdSpecies: function(e) {
		var locationID = $(e.target).data('location');

//		manager.updateSpeciesTab();
	}
};


// start 'er up (on DOM ready)
$(manager.init);