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
	$scope.loading = false;
	$scope.csv = false;
	reader.onload = function()
	{
		console.log(reader.result);
		$scope.loading = false;
		$scope.csv = reader.result;
		$scope.columns = $scope.csv.split(/[\n\r]/)[0].split(';');
	};
	this.loadCSV = function(file)
	{
		$scope.loading = true;
		console.log(file);
		reader.readAsText(file);
	};
	this.format = '';
	this.previewImage = false;
	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:{}});
	}
}