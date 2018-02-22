angular.module('pdfgen')
	.factory('API',[
		'$resource',
		function($resource)
		{
			return $resource(
				'/api.php/:action',
				{},
				{
					'GetPreview': { method: 'POST', params: { action: 'preview' } },
					'GetPDF': { method: 'POST', params: { action: 'download'} }
				}
			);
		}
	]);