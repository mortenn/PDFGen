angular.module('pdfgen').component(
	'generator',
	{
		controller: ['Upload',Generator],
		templateUrl: 'view/generator.html'
	}
);

function Generator()
{
	var reader = new FileReader();
	reader.onload = function()
	{
		console.log(reader.result);
	};
	this.loadCSV = function(file)
	{
		reader.readAsText(file);
	};
}