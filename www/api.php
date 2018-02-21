<?php
	if($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
		die();

	$request = explode('/', $_SERVER['PATH_INFO']);
	if(count($request) < 2 || $request[0] != '')
	{
		header('HTTP/1.0 400 Bad Request');
		die();
	}

	require_once('../PDFGenerator.php');

	$json = file_get_contents('php://input');
	$data = false;
	if($json)
		$data = json_decode($json);

	$response = false;
	switch($request[1])
	{
		case 'preview':
			// render to temp
			$tempfile = tempnam('/tmp', 'pdf');
			$generator = new PDFGenerator();
			$generator->RenderPage($data);
			$generator->Output('F', $tempfile);
			$imagick = new Imagick($tempfile.'[0]');
			$imagick->setImageFormat('jpg');
			header('Content-Type: text/plain');
			$response = ['image' => 'data:image/JPEG;base64,'.$imagick];
			break;

		default:
			header('HTTP/1.0 501 Not Implemented');
	}

	if($response)
	{
		header('Content-Type: application/json');
		echo json_encode($response);
	}