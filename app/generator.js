angular.module('pdfgen').component(
	'generator',
	{
		controller: ['Upload',Generator],
		templateUrl: 'view/generator.html'
	}
);

function Generator()
{
	this.loadCSV = function(file)
	{
		console.log(file);
	};
}