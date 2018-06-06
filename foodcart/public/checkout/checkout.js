angular.module('checkout',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/checkout',{
		templateUrl: 'public/checkout/checkout.html',
		controller: 'checkoutCtrl'
	});
}])

.controller('checkoutCtrl', ['$scope','$window','CommonService', function($scope, $window,CommonService){
		$scope.checkedItems = CommonService.getItems();
		$scope.checkoutTotal = CommonService.getTotal();

		$scope.confirmCheckout = function(){
			$window.alert("Your order will be delivered in x minutes");
		};
}])