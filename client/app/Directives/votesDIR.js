angular.module('fiddio')
  .directive('votes', ['$http', function($http) {
    return {
      restrict: 'E',
      template: '<span><i class="fa fa-chevron-circle-up" ng-click="vote(1)"></i> <i class="fa fa-chevron-circle-down" ng-click="vote(-1)"></i></span>',
      replace: true,
      scope: {
        responseId: '@'
      },
      link: function(scope, elm, attr) {
        // fetch current vote from server and store it on $scope
        $http({ method: 'GET', url: '/api/response/' + attr.responseId + '/vote' })
        .then(function(response){
          scope.currentVote = response.data.vote;
        },function(response){});

        // set up function to up- and downvote
        scope.vote = function(value) {
          var newVote = value === scope.currentVote ? 0 : value;
          $http({ method: 'POST',
            url: '/api/response/' + attr.responseId + '/vote',
            data: { vote: newVote } })
          .then(function(response){
            scope.currentVote = newVote;
            scope.updateStyle();
          }, function(response){});
        };

        scope.updateStyle = function() {
          //Update style based on scope.currentVote
        };
      } 
    };
  }]);