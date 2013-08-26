define([], function() {

	var L = {
		// header
		about: "Sur",

		// main panel
		map: "Carte",
		locations: "Emplacements",
		bird_species: "Espèces d'oiseaux",
		notable_sightings: "Observations remarquables",
		species: "Espèce",
		date: "Date",
		scientific_name: "Nom scientifique",
		reported_by: "Rapporté par",
		sightings: "Observations",
		last_seen: "Dernière visite",
		days: "jours",
		day: "jour",
		locations_seen: "Lieux vus",
		num_reported: "# visite",
		last: "denier",
		seen_at: "vu à",
		status: "Statut",
		confirmed: "Confirmé",
		reviewed: "Examiné",
		not_reviewed: "Pas examiné",

		// sidebar
		bird_sightings: "Observations d'oiseaux",
		popular_birding_locations: "Endroits populaires",
		more_search_options: "Plus d'options &raquo;",
		hide_search_options: "&laquo; Masquer les options de recherche",
		location: "Emplacement",
		select_unselect_all: "Sélectionner / Désélectionner tous",
		show_obs_made_within_last: "Afficher observations faites dans la dernière",
		day_or_days: "jour(s)",
		limit_to_locations: "Limiter aux endroits avec les observations faites dans les",
		search: "Rechercher",
		please_enter_location_search_default: "Entrer un emplacement",
		please_enter_location: "S'il vous plaît entrer un emplacement.",
		please_select_location_from_dropdown: "S'il vous plaît sélectionnez un emplacement dans le champ Emplacement auto-complété.",
		please_enter_more_specific_location: "S'il vous plaît entrer une localisation plus précise.",
		num_species_seen_at_location: "1% des espèces d'oiseaux observées à cet endroit dans le dossier% 2 derniers jours.",
		no_results_found: "Aucun résultat",

		// about dialog
		contact: "Contacter",
		about_birdsearch: "Sur birdsearch.org",
		thanks: "Merci!",
		contact_me_para: "J'ai trouvé un bug? Vous avez une idée sur la façon d'améliorer ce site? J'aimerais vous entendre.",
		about_para1: "J'ai écrit ce site à remplir ce que je considère comme une lacune assez remarquable dans la fonctionnalité du site %1 incroyable.",
		about_para2: "Si vous n'avez pas encore découvert eBird, faites-le maintenant. C'est une ressource formidable pour les ornithologues, les ornithologues, les éducateurs - toute personne intéressée par les oiseaux. Les gens du monde entier soumettent des millions d'observations par an à eBird, offrant une mine d'informations pour la visualisation et l'analyse. Plus les gens l'utilisent, plus il devient.",
		about_para3: "Le problème est que la fonctionnalité de recherche actuellement disponibles sur eBird est assez limité. Comme un ornithologue amateur, je veux un simple aperçu de haut niveau d'une région: où sont les lieux d'observation des oiseaux populaires? Qui spots rapportent le plus d'oiseaux? Qu'est-ce raretés sont d'être repéré dans ma région, et où? Ce site vise à aider à combler cette lacune.",
		about_para4: "Tout le code source de ce site est gratuit et open source et disponible sur %1.",
		make_comment: "Ajouter un commentaire sur <a href=\"http://www.benjaminkeen.com/ebirdsearch-org/\">ce post</a>, ou envoyez-moi à <a href=\"mailto:ben.keen@gmail.com\">ben.keen@gmail.com</a>.",
		have_fun: "Amusez-vous!",
		close: "Fermer",
		thanks_homies: "Merci!",
		thanks_blurb: "Ce site est presque entièrement JS, CSS + HTML, avec un couple de pages côté serveur (PHP) jetés pour gérer la conversion de eBird données API en JSON. Ce qui suit est une liste de tous les scripts open source et les ressources utilisées. A <b>grand</b> merci à tous les développeurs pour vos travaux. Vous roche.",
		thanks_footer: "Enfin, <span class=\"cornellThanks\"> un grand merci à la <b>Cornell Lab of Ornithology</b> pour créer leur <a href=\"https://confluence.cornell.edu/display/CLOISAPI/eBird+API+1.1\" target=\"blank\">API publique</a></span>, ce qui rend ce site possible.",
		help_translate: "Help Translate",
		translate_para1: "If you're interested in helping translate this site, I'd love to hear from you! The currently available languages are all generated via Google Translate, so they're probably pretty low quality. All the source code for this site (text included) is found on <a href=\"https://github.com/benkeen/birdsearch.org\" target=\"_blank\">github, here</a>. All you need to do is \"fork\" the repository (i.e. make a copy of it), add or modify a <a href=\"https://github.com/benkeen/birdsearch.org/tree/master/lang\">translation file</a> and send it back to me via a \"pull request\".",
		translate_para2: "It sounds a little technical, but it's actually exceedingly simple. If you have any questions, feel free to <a href=\"mailto:ben.keen@gmail.com\">drop me a line</a>! :)",

		// map
		view_bird_species: "Voir les espèces d'oiseaux observées à cet endroit",
		view_full_info: "Voir une information complète",

		// footer
		site_not_affiliated_with_ebird: "Tous courtoisie de données %1"
	};

	return L;
});