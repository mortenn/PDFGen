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
						$this->Image($this->formatValue($field->image, $data), (int)$field->x, (int)$field->y, (int)$field->w);
						break;
					case 'text':
						if(!isset($field->colour))
							$this->SetTextColor(0);
						else if(preg_match('/#(..)(..)(..)', $field->colour, $matches))
						{
							if($matches[1] == $matches[2] && $matches[1] == $matches[3])
								$this->SetTextColor(hexdec($matches[1]));
							else
								$this->SetTextColor(hexdec($matches[1]),hexdec($matches[2]),hexdec($matches[3]));
						}
						$this->Cell($field->w, $field->h, $this->formatValue($field->text, $data), 0, 0, $field->align);
						break;
				}
			}
		}

		private function formatValue($value, $data)
		{
			if(!preg_match('/%\d+%/', $value))
				return $value;
			foreach($data as $i => $v)
				$value = str_replace('%'.($i+1).'%', $v, $value);
			return $value;
		}

		private $format;
	}