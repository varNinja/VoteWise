'use srtict';
var controllername = 'comparisonCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = []; // $routeParams

    function controller($scope, $rootScope) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {
        };
        activate();


        $scope.questionSet = {}
        $scope.questionSet.question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus metus urna. Vivamus sit amet mi eros. Cras fermentum enim eros, ac sodales lectus gravida ac. Nullam ex magna, luctus non massa id, aliquet blandit felis. Nulla dapibus non tellus ut finibus. Donec tristique tristique interdum.';
        $scope.questionSet.topic = "privacy";
        $scope.questionSet.current = 1;
        $scope.questionSet.total = 20;

        $scope.checkboxClass = 0;
        console.log("inside comparisonCtrl")

        $scope.makeArrayFromDatabase = function(input){
            var myArray = []
            for (var i = 0; i < 6; i++){
                if (i != (input-1)){
                    myArray.push(false);
                    console.log(myArray);
                } else if (i == input-1){
                    myArray.push(true);
                    console.log(myArray);
                };
            };
        };

        $scope.setAnswerImportanceEnum = function(input){
            importance = "";
            if (input == 1){
                importance = "Unimportant";
            } else if( input == 2){
                importance = "Important";
            } else if (input == 3){
                importance = "Very Important";
            }
        }


        // findAnswerColorDiff finds the difference between the users answer and 
        // answers of the politicians.
        // After this is found, it calls $scope.setColorDifference to set this 
        // property each property object in the main object.

        $scope.findAnswerColorDiff = function(){
            var choice, differenceBetween, choice2
            for (key in $scope.profileCompare){
                if ($scope.profileCompare.hasOwnProperty(key)){
                    for (var i = 0; i < $scope.currentUser.You.questionAnswer.length; i++){
                        if ($scope.currentUser.You.questionAnswer[i] == true){
                            choice = i;
                            console.log(choice);
                        }
                    }
                    for (var i = 0 ; i < $scope.profileCompare[key].questionAnswer.length; i++){
                        if ($scope.profileCompare[key].questionAnswer[i] == true){
                            choice2 = i;
                            differenceBetween = 0;
                        }
                    }
                    if (choice2 == choice) {
                        $scope.profileCompare[key].difference = "_0pcnt";
                        console.log("Difference for " + key
                         + " is " + $scope.profileCompare[key].difference);
                    } else if (choice2 < choice) {
                        for (var i = 0; i < 6; i++){
                            choice2++
                            differenceBetween++
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween) 
                                break 
                            }
                        }
                    } else if (choice < choice2) {
                        for (var i = 0; i < 6; i++){
                            choice++
                            differenceBetween++
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween)
                                break 
                            }
                        }
                    }
                }
            }
        };


        // this function actually sets the difference property of each user's answer
        // to a string which is a css class. This is then binded in the HTML

        $scope.setColorDifference = function(differenceBetween){
            if (differenceBetween == 1){
                $scope.profileCompare[key].difference = "_20pcnt";
                console.log("Difference for " + key
                + " is " + $scope.profileCompare[key].difference);
            } else if (differenceBetween == 2){
                $scope.profileCompare[key].difference = "_40pcnt";
                console.log("Difference for " + key
                + " is " + $scope.profileCompare[key].difference);
            } else if (differenceBetween == 3){
                $scope.profileCompare[key].difference = "_60pcnt";
                console.log("Difference for " + key
                + " is " + $scope.profileCompare[key].difference);
            } else if (differenceBetween == 4){
                $scope.profileCompare[key].difference = "_80pcnt";
                console.log("Difference for " + key
                + " is " + $scope.profileCompare[key].difference);
            } else if (differenceBetween == 5){
                $scope.profileCompare[key].difference = "_100pcnt";
                console.log("Difference for " + key
                + " is " + $scope.profileCompare[key].difference);
            }
        }


        $scope.currentUser = {
            You: {
                questionAnswer: [false, false, true, false, false, false],
                questionImportance: "Unimportant",
            }
        };

        $scope.profileCompare = {

            Pizza: {
                name: "Pizza",
                questionAnswer: [false, false, false, false, false, true],
                questionImportance: "Important",
                difference: undefined,
                office: "Cheese",
                index: undefined
            },
            GreenieBigNameGuy: {
                name: "Greenie Centipede",
                questionAnswer: [false, false, false, false, true, false],
                questionImportance: "Very Important",
                difference: undefined,
                office: "Green Beans",
                index: undefined
            },
            Red: {
                name: "Seeing Red",
                questionAnswer: [false, false, false, true, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "milk",
                index: undefined
            },
            Yellow: {
                name: "Christmas Tree",
                questionAnswer: [false, false, true, false, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "Elf",
                index: undefined
            },
            Yellow2: {
                name: "Buffalo Bill",
                questionAnswer: [false, true, false, false, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "grass",
                index: undefined
            },
            Yellow3: {
                name: "Ice Cream",
                questionAnswer: [true, false, false, false, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "ping pong",
                index: undefined
            },
            Yellow4: {
                name: "Antelope",
                questionAnswer: [false, false, false, true, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "sneezing",
                index: undefined
            },
            Yellow5: {
                name: "Boa Boa Boa",
                questionAnswer: [false, true, false, false, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "Squirly Things",
                index: undefined
            },
            Yellow6: {
                name: "Screw",
                questionAnswer: [true, false, false, false, false, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "upside down",
                index: undefined
            },
            Yellow7: {
                name: "Rainbow",
                questionAnswer: [false, false, false, false, true, false],
                questionImportance: "Not Important",
                difference: undefined,
                office: "ghost",
                index: undefined
            },
            Yellow33: {
                name: "Bugs",
                questionAnswer: [false, false, false, false, false, true],
                questionImportance: "Not Important",
                difference: undefined,
                office: "pokemon",
                index: undefined
            }
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
