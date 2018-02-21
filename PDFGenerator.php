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

		public function RenderPreview($data)
		{
			$this->format = $data->format;
			$this->AddPage();
			$this->SetFont('Arial','',14);
			$this->RenderPage(explode(';', $data->data[1]));
		}

		public function RenderPage($data)
		{
			foreach($this->format as $field)
			{
				switch($field->type)
				{
					case 'image':
						$this->Image($field->image, (int)$field->x, (int)$field->y, (int)$field->w);
						break;
				}
			}
		}

		private $format;
	}