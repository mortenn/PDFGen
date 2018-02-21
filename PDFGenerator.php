<?php
	require_once('fpdf/fpdf.php');

	class PDFGenerator extends FPDF
	{
		public function __construct($orientation = 'L', $unit = 'mm', $size = 'A4')
		{
			parent::__construct($orientation, $unit, $size);
			$this->SetAutoPageBreak(false);
		}

		public function Header()
		{

		}

		public function Footer()
		{
		}

		public function RenderPage($data)
		{
			$this->AddPage();
			$this->Write(5, 'Test');
		}
	}