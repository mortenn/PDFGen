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
	var ctrl = this;
	reader.onload = function()
	{
		ctrl.csv = reader.result;
		ctrl.columns = ctrl.csv.split('\n')[0].split(';');
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