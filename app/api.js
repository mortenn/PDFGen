angular.module('pdfgen')
	.factory('API',[
		'$resource',
		function($resource)
		{
			return $resource(
				'/api.php/:action',
				{},
				{
					'GetPreview': { method: 'GET', params: { action: 'preview' } }
				}
			);
		}
	]);