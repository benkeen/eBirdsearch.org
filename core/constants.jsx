const C = {
	DEBUG: false,
	DEFAULT_LOCALE: 'en',
  DEFAULT_MAP_TYPE: '',
	TRANSITION_SPEED: 200,

	PANELS: {
		OVERVIEW: 'overview',
		LOCATIONS: 'locations',
		SPECIES: 'species'
	},

	CORE: {
		APP_VERSION: "2.0.0 - BETA",
		RELEASE_DATE: "Jan 17, 2015",
		GITHUB_URL: "https://github.com/benkeen/birdsearch.org"
	},

	SEARCH_SETTINGS: {
		DEFAULT_SEARCH_DAYS: 7,
		NUM_SEARCH_DAYS: 30
	},

	PANEL_DIMENSIONS: {
		PADDING: 0,
		TOP: 60,
		OVERVIEW_PANEL_HEIGHT: 106,
		LEFT_PANEL_WIDTH: 300,
		PANEL_FOOTER_HEIGHT: 24
	},

	COLOUR_RANGES: {
		RANGE1: 10,
		RANGE2: 20,
		RANGE3: 30,
		RANGE4: 40,
		RANGE5: 50,
		RANGE6: 60,
		RANGE7: 70,
		RANGE8: 80
	},

	LOCATION_SORT: {
		FIELDS: {
			LOCATION: 'LOCATION_SORT_LOCATION',
			SPECIES: 'LOCATION_SORT_SPECIES'
		}
	},

	SPECIES_SORT: {
		FIELDS: {
			SPECIES: 'SPECIES_SORT_SPECIES',
			NUM_LOCATIONS: 'SPECIES_SORT_NUM_LOCATIONS',
			LAST_SEEN: 'SPECIES_SORT_LAST_SEEN',
			NUM_REPORTED: 'SPECIES_SORT_NUM_REPORTED'
		}
	},

	SORT_DIR: {
		DEFAULT: 'SORT_DIR_DEFAULT',
		REVERSE: 'SORT_DIR_REVERSE'
	},

	MISC: {
		MAX_SEARCH_DAYS: 30
	},

  ONE_OFFS: {
    MAIN_SEARCH_FIELD_FOCUS: 'MAIN_SEARCH_FIELD_FOCUS'
  },

	ABOUT_TABS: {
		HELP: 'ABOUT_TABS_HELP',
		ABOUT: 'ABOUT_TABS_ABOUT',
		TRANSLATE: 'ABOUT_TABS_TRANSLATE',
		CONTACT: 'ABOUT_TABS_CONTACT'
	}

};

export { C };
