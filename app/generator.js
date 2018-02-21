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
	this.loading = false;
	this.csv = false;
	reader.onload = function()
	{
		ctrl.loading = false;
		ctrl.csv = reader.result;
		ctrl.columns = ctrl.csv.split(/[\n\r]/)[0].split(';');
	};
	this.loadCSV = function(file)
	{
		ctrl.loading = true;
		reader.readAsText(file);
	};
	this.format = '';
	this.previewImage = false;
	this.preview = function()
	{
		this.previewImage = API.GetPreview({format:this.format,data:{}});
	}
}