<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">

    <title>Title</title>

    <!-- Bootstrap core CSS -->
    <link href="/components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Sticky footer CSS -->
    <link rel="stylesheet" href="/css/stickyfooter.css">

    <!-- Custom styles for each page -->
    @yield('stylesheet')

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

		<div id="wrap">
			@include('partials.header')
			
			@yield('content')
		</div>

		<div id="footer">
			@include('partials.footer')
		</div>


		<script src="/components/jquery/jquery.min.js"></script>
		<script src="/components/bootstrap/dist/js/bootstrap.min.js"></script>
		@yield('js')
	</body>
</html>
