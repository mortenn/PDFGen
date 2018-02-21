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
		if(type === 'image' || type === 'qr')
		{
			item.h = -1;
			item.colour = -1;
			item.w = -1;
			item.align = -1;
		}
		else
		{
			item.h = item.h === -1 ? '' : item.h;
			item.colour = item.colour === -1 ? '' : item.colour;
			item.w = item.w === -1 ? '' : item.w;
			item.align = item.align === -1 ? '' : item.align;
		}
		if(type !== 'image')
			item.image = '';
		if(type !== 'column')
			item.column = '';
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
		this.columns = this.csv[0].split(';');
	};

	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:this.csv});
	}
}