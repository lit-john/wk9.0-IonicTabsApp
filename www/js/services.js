
angular.module('starter.services', [])
// Notice that I inject in $http , a codre angular service.
// Read more at https://docs.angularjs.org/api/ng/service/$http
.factory('Chats', function($http, $log) {
  var friends = null;
  var opt = {withCredentials:false};
    
  function getFriends() {
      
      // Call $http.get which will return a promise
      var httpPromise = $http.get('//localhost:3000/', opt);
      
      // At some stage in the futute the httpPromise will either
      // be fulfilled (success) or rejected. We need to tell the
      // promise what functions (aka handlers) to call when either
      // of these happens. We associate these 'fulfilled' and 'rejected'
      // handlers with the promise by calling it's "then" method
      httpPromise.then(function onFulfilled(value){
          // For testing purposes I am logging out the value
          $log.log("fulfilled handler of the httpPromise with value: " + value.data.friends);
          
          // This function will be called when (if) the promise
          // is successfully fulfilled
          friends = value.data.friends;
          
          // the the then method on a promise actually returns a new 
          // derived promise which itself can have a fulfilled and 
          // reject handler associated with it. Because this code
          // is within the fulfilled handler of the httpPromise,
          // returning a value from here will cause the fulfilled
          // handler to be called, on the returned derived promise,
          // with the returned value as an argument
          return value;
      }, function onRejected(reason){
          $log.log("failure handler of the httpPromise with reason: " + reason);
          return reason;
      });
          
      return httpPromise;
  }

  return {
    all: function() {
      return getFriends();
    },
    remove: function(chat) {
      friends.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === parseInt(chatId)) {
          return friends[i];
        }
      }
      return null;
    }
  };
});
/*

(function(){
    var Chats = function($http, $log){
        
        var friends = null;
        var opt = {withCredentials:false};
        
        function getFriends() {
            if (friends == null) {
                $http.get('//localhost:3000/', opt)
                .then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $log("Got successful response back");
                        friends = response.friends;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log("Error with response");
                        friends = "[We have a problem]";
                    });
            }
            
            return friends;
        }
       
        var factory = {};
        
        
        factory.all = function() {
            return getFriends();
        };
        
        factory.remove = function(chat) {
            friends.splice(chats.indexOf(chat), 1);
        };
        
        factory.get = function(chatId) {
            for (var i = 0; i < friends.length; i++) {
                if (friends[i].id === parseInt(chatId)) {
                return friends[i];
                }
            }
            return null;
        };
        
        return factory;
    };
    
    Chats.$inject = ['$http', '$log'];
    
    angular.module('starter.services').factory('Chats', Chats)
}());
*/