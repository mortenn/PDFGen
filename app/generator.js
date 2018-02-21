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
	this.loading = false;
	this.csv = false;
	reader.onload = function()
	{
		$scope.$apply(
			function()
			{
				ctrl.loading = false;
				ctrl.csv = reader.result;
				ctrl.columns = ctrl.csv.split(/[\n\r]/)[0].split(';');
			}
		);
	};
	this.loadCSV = function(file)
	{
		this.loading = true;
		reader.readAsText(file);
	};
	this.format = '';
	this.previewImage = false;
	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:{}});
	}
}