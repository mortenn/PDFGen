angular.module('pdfgen').component(
	'generator',
	{
		controller: ['API','$scope',Generator],
		templateUrl: 'view/generator.html'
	}
);

function Generator(API, $scope)
{
	var reader = new FileReader();
	var ctrl = this;
	reader.onload = function(){ $scope.$apply(function(){ ctrl.loadedCSV(); });	};

	this.loading = false;
	this.csv = false;
	this.previewImage = false;
	this.format = [];

	this.setItemType = function(item, type)
	{
		if(type !== 'text')
		{
			delete item.text;
			delete item.align;
			delete item.h;
			delete item.colour;
			delete item.w;
		}
		if(type !== 'image' && type !== 'qr')
			delete item.image;
	};

	this.loadCSV = function(file)
	{
		this.loading = true;
		reader.readAsText(file);
	};

	this.loadedCSV = function()
	{
		this.loading = false;
		this.csv = reader.result.split(/[\n\r]+/);
	};

	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:this.csv[1]});
	};

	this.download = function()
	{
		API.GetPDF({format:this.format,data:this.csv.slice(1)},
			function(document)
			{
				window.open("data:application/pdf;base64, " + encodeURIComponent(document.content));
			}
		);
	};

	this.import = function()
	{
		this.format = angular.fromJson($('#advancededitor').val())
	};

	this.export = function()
	{
		$('#advancededitor').val(angular.toJson(this.format));
	};
}