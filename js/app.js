var app = angular.module("SolutionApp",['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
				.when("/",{
					templateUrl : "partials/questions.html",
					controller : "HomeController"
				})
				.when('/display/sol/:name',{
					templateUrl : "partials/display.html",
					controller : "SolutionController"
				})
				.otherwise({
					redirectTo : "/"
				});
});

app.controller("HomeController",["$scope","SolutionService",function($scope,SolutionService){
	
	$scope.name = "questions";
	$scope.questionsList = SolutionService.qList;
	
}]);

app.controller("SolutionController",["$scope","$routeParams","SolutionService",function($scope,$routeParams,SolutionService){
	
	var selectedQuestion = $routeParams.name;
	$scope.language = SolutionService.language;
	$scope.result = SolutionService.findDetails(selectedQuestion);
	$("#code").load($scope.result.code[0].url);
	
	$("select").on("change",function(){
		for(var i = 0; i < $scope.result.code.length; i++){
			if($(this).val() === $scope.result.code[i].lang){
				$("#code").load($scope.result.code[i].url);
			}
		}
	});
}]);

app.service("SolutionService",function(){
	var questionsService = {};
	
	questionsService.language = ["Java","C"];
	
	questionsService.qList = [
		{
			name:"Palindrome program", 
			desc:"A palindrome is a number or word which reads the same backward as forward. For eg. 121 is a palindrome 	number as reverse of 121 is same as 121. To solve this problem : first take a number as an input, copy that number into a new variable \"temp\". Calculate the reverse of the entered number. Finally, compare this reverse of the number with temp. If both the number are same then print Number is palindrome, else not a palindrome.",
			code:[
				{lang: "Java", url: "Java/palindrome.html"},
				{lang: "C", url: "C/palindrome.html"}
			]
		},
		{
			name:"Factorial program", 
			desc:"For an integer n greater than or equal to 1, the factorial is the product of all integers less than or equal to n but greater than or equal to 1. The factorial value of 0 is equal to 1. The factorial values for negative integers are not defined. Mathematically, n! = n * (n-1) * (n-2) * .... 1. To solve this problem : first take a positive number as an input, calculate the product of all the number less than equal to input number excluding 0.", 
			code:[
				{lang: "Java", url: "Java/factorial.html"},
				{lang: "C", url: "C/factorial.html"}
			]
		},
		{
			name:"Fibonacci series", 
			desc:"Fibonacci series is series of numbers in which each number is the sum of the two preceding numbers. The simplest is the series 0, 1, 1, 2, 3, 5, 8, etc. To solve this problem : first we take number of terms as input, print 0 and 1 as it is. Then, calculate the sum of first two number and print the sum.", 
			code:[
				{lang: "Java", url: "Java/fibonacci.html"},
				{lang: "C", url: "C/fibonacci.html"}
			]
		},
		{
			name:"Bubble sort", 
			desc:"Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.", 
			code:[
				{lang: "Java", url: "Java/bubblesort.html"},
				{lang: "C", url: "C/bubblesort.html"}
			]
		},
		{
			name:"Find third largest number in array", 
			desc:"To solve this problem : first get the largest element in array while you do so constant update second largest and third largest element. Another way is to sort the array in descending order and print 3 element.", 
			code:[
				{lang: "Java", url: "Java/largest.html"},
				{lang: "C", url: "C/largest.html"}
			]
		}
	];
	
	questionsService.findDetails = function(name){
		for(var i = 0; i < questionsService.qList.length; i++){
			if(questionsService.qList[i].name === name){
				return questionsService.qList[i];
			}
		}
	}
	
	return questionsService;
});