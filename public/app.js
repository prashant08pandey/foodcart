angular.module('foodCart', [
	'ngRoute',
	'cart',
	'checkout'
 ])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({
		redirectTo: '/cart'
	});
}])