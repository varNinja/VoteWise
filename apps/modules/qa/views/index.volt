<!DOCTYPE html>
<html lang="en">
	<head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="VoteWise">
                <meta name="author" content="Silent Monkeys">
                <link rel="icon" href="" type="image/x-icon" />
                <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
                <link href='http://fonts.googleapis.com/css?family=Gentium+Basic:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
                {{ stylesheet_link('css/base.min.css') }}
                {{ stylesheet_link('css/votewise.css') }}
                {{ get_title() }}
	</head>
	<body>
		{{ content() }}
                {{ javascript_include('js/jquery/jquery.min.js') }}
                {{ javascript_include('js/bootstrap/bootstrap.min.js') }}
                {{ javascript_include('js/utils.js') }}
                {{ javascript_include('js/votewise.js') }}
	</body>
</html>
