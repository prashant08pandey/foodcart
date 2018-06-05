angular.module('cart',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/cart',{
		templateUrl: 'public/cart/cart.html',
		controller: 'cartCtrl'
	});
}])

.controller('cartCtrl', ['$scope','$http', function($scope,$http){
	$http.get('public/food.json').then(function(res){
		$scope.foodData = res.data;
	})

	$scope.total = function(){
		var t = 0;
		for(var k in $scope.foodData){
			t += parseInt($scope.foodData[k].selected);
		}
		return t;
	}
}])

.directive('checkList', function(){
	return{
		restrict: 'E',
		scope:{
			ingredients: '=',
			imagepath: '=',
			price: "=",
			selected: "="
		},
		template: function(elem, attr){
			return '<div class="panel-body">\
						<img ng-src="{{imagepath}}" class="img-thumbnail" width="200" height="150">\
						<div class="row">\
						<div class="col col-xs-6 col-sm-6 col-md-6 col-ld-6">\
						<h4>Ingredients:<h4>\
						<div ng-repeat="i in ingredients">\
							<span>{{i.name}}<span>\
						</div>\
						</div>\
						<h4>Price:<h4>\
						<div class="col col-xs-6 col-sm-6 col-md-6 col-ld-6">\
							<p>{{price}}</p>\
						</div>\
						</div>\
							<div class="radio">\
								<label><input type="radio" ng-value="{{price}}" ng-model="$parent.selected">Add to cart</label>\
							</div>\
						</div>'	
		}
	};
})