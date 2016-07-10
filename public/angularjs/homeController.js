var homeApp = angular.module('homeApp', []);

homeApp.controller('HomeController', function($scope, $http) {
	console.log("inside HomeProfileController");
	
	
	$scope.login = function(){
		console.log("inside login");
		console.log("bsjj"+$scope.password);
		 $http({
			 method: "GET",
			 url : '/login',
			 data: {
				 "username" : $scope.username,
				 "password" : $scope.password
			 }
		 }).success(function(data) {
			 if(data.statusCode==200){
				 window.location.assign("/confirmation"); 
			 }
			  
		 }).error(function(error) {
				$scope.unexpected_error = false;
			});
	 };
});