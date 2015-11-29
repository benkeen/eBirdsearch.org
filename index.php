<!DOCTYPE html>
<html>
<head>
	<title>birdsearch.org</title>
	<meta name="description" content="birdsearch.org - browse worldwide birding locations and sightings" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/compiled/styles.css" rel="stylesheet" type="text/css" />

</head>
<body data-serverdatetime="<?php echo date('U'); ?>">

<div id="pageWrapper">
	<header></header>
	<section id="mainPanel"></section>
</div>

<script src="https://maps.googleapis.com/maps/api/js?v=3&sensor=true&libraries=places,geometry"></script>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="dist/bundle.js"></script>

<!--
<% if (ENV == "DEV") { %>
<script src="libs/html5shiv.js"></script>
<script src="libs/modernizr-2.0.6.min.js"></script>
<script src="libs/jquery-ui-1.10.3.custom.min.js"></script>
<script src="libs/jquery.tablesorter.min.js"></script>
<script src="libs/jquery.tablesorter.widgets.js"></script>
<script src="libs/jquery.metadata.js"></script>
<script src="libs/spinners.min.js"></script>
<script src="libs/gmaps.inverted.circle.js"></script>
<script src="libs/bootstrap-modal.js"></script>
<script src="libs/bootstrap-transition.js"></script>
<script src="libs/require.min.js"></script>
<script src="core/requireConfig.js"></script>
<% } else if (ENV == "PROD") { %>
<script src="build/core-js.min.js"></script>
<% } %>

<% if (ENV == "DEV") { %>
<script>require(["core/appStart.js"], function() {});</script>
<% } else if (ENV == "PROD") { %>
<script>require(["<%=APP_START_PATH%>"], function() {});</script>
<% } %>
-->

<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-43097657-1', 'birdsearch.org');
	ga('send', 'pageview');
</script>
</body>
</html>
