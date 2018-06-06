angular.module('cart',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/cart',{
		templateUrl: 'public/cart/cart.html',
		controller: 'cartCtrl'
	});
}])

.controller('cartCtrl', ['$scope','$http', 'CommonService', function($scope,$http, CommonService){
	$scope.foodData = CommonService.getItems();

	if(!$scope.foodData){
		$http.get('public/food.json').then(function(res){
			$scope.foodData = res.data;
		});
	}

	$scope.total = function(){
		var t = 0;
		for(var k in $scope.foodData){
			t += parseInt($scope.foodData[k].checked);
		}
		CommonService.setTotal(t);

		return CommonService.getTotal();
	}

	$scope.$watch('foodData', function(){
		CommonService.setItems($scope.foodData);
	})
}])

.directive('checkList', function(){
	return{
		restrict: 'E',
		scope:{
			ingredients: '=',
			imagepath: '=',
			price: "=",
			checked: "="
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
								<label><input type="radio" ng-value="{{price}}" ng-model="checked"><strong>Add to cart</strong></label>\
							</div>\
						</div>'	
		}
	};
})

.service('CommonService', function(){
	var items = '';
	var Total = 0;

	return{
		getItems: function(){
			return items;
		},
		setItems: function(value){
			items= value;
		},
		getTotal: function(){
			return Total;
		},
		setTotal: function(value){
			Total = value;
		}
	}
})