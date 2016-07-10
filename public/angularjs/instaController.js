var instaFeedApp = angular.module('instaFeedApp', []);


instaFeedApp.controller('CustomerFeedController', function($scope, $http) {
	console.log("inside CustomerFeedController");
	$http({
		 method: "GET",
		 url : '/getCustomerDetails',
	 })/*.success(function(data) {
		 if(data.statusCode=="profileData"){
			 console.log("followers "+data.myFollowers);
			 $scope.followers = data.countData.myFollowers;
			 $scope.following = data.countData.meFollowing;
		 }
		 else if (data.statusCode == "invalidLogin"){
			 $scope.existingUserName = false;
		 } 
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});*/
	
});
