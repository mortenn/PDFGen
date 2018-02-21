angular.module('pdfgen').component(
	'generator',
	{
		controller: ['API',Generator],
		templateUrl: 'view/generator.html'
	}
);

function Generator(API)
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
	this.format = '';
	this.previewImage = false;
	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:{}});
	}
}