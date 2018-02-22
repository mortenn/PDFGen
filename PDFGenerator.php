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
			$this->RenderPage(explode(';', $data->data));
		}

		public function Render($data)
		{
			$this->format = $data->format;
			$this->SetFont('Arial','',14);
			foreach($data->data as $page)
			{
				$this->AddPage();
				$this->RenderPage(explode(';', $page));
			}
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
						if(isset($field->x) && isset($field->y))
							$this->SetXY($field->x, $field->y);
						else if(isset($field->x))
							$this->SetX($field->x);
						if(isset($field->s))
							$this->SetFontSize($field->s);
						$this->Cell(
							$field->w, $field->h,
							iconv('UTF-8', 'windows-1252', $this->formatValue($field->text, $data)),
							0, 0,
							$field->align
						);
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