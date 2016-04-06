angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $log) {
    $scope.msg = "Hello from CMM yr 4";
})

.controller('ChatsCtrl', function($scope, Chats, $log) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
  Chats.all().then(function success(response) {
      $log.log("Got a response: " + response.data);
      $scope.chats = response.data.friends;
  });
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
