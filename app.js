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
            controller: 'MainCtrl as main'
          })
          .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl as postsComments'
          })
        $urlRouterProvider.otherwise('home')
      }])

  // service function definitions
  function posts(){
    var appdata = {}
    appdata.posts = []
    appdata.incrementUpvotes = function(post) {
      post.upvotes += 1
    }
    return appdata
  }

  // controller function definitions
  function MainCtrl($scope,posts){
    var self = this

    posts.posts = [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ]

    self.posts = posts.posts

    self.addPost = function(){
      if(!$scope.title || $scope.title === '') {return}
      self.posts.push({
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

    self.incrementUpvotes = function(post){
      posts.incrementUpvotes(post)
    }
  }

  function PostsCtrl($scope,$stateParams,posts){
    var self = this

    $scope.post = posts.posts[$stateParams.id]

    self.addComment = function(){
      if($scope.body === '') {return}
        $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      })
      $scope.body = ''
    }

    self.incrementUpvotes = function(comment){
      posts.incrementUpvotes(comment)
    }
  }

})()
