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
		this.previewImage = API.GetPreview({format:this.format,data:this.csv});
	};

	this.import = function()
	{
		this.format = angular.fromJson($('#advancededitor').val())
	};
}