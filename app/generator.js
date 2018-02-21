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
	this.format = '';
	this.previewImage = false;

	this.loadCSV = function(file)
	{
		this.loading = true;
		reader.readAsText(file);
	};

	this.loadedCSV = function()
	{
		ctrl.loading = false;
		ctrl.csv = reader.result;
		ctrl.columns = ctrl.csv.split(/[\n\r]/)[0].split(';');
	};

	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:{}});
	}
}