(function(){

  var app = angular.module('flapperNews', ['ui.router'])
    app.factory('posts', posts)
    app.controller('MainCtrl',MainCtrl)
    app.controller('PostsCtrl',PostsCtrl)
    app.config(['$stateProvider','$urlRouterProvider',
      function($stateProvider,$urlRouterProvider){
        $stateProvider
          .state ('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
          })
          .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
          })
        $urlRouterProvider.otherwise('home')
      }])

  // service function definitions
  function posts(){
    var o = {posts: []}
    return o
  }

  // controller function definitions
  function MainCtrl($scope, posts){
    $scope.posts = posts.posts

    $scope.posts = [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ]

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') {return}
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      })
      $scope.title = ''
      $scope.link = ''
    }

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1
    }
  }

  function PostsCtrl($scope,$stateParams,posts){
    $scope.posts = posts.posts
    $scope.post = posts.posts[$stateParams.id]
    console.log(posts.posts.length)
  }

})()
