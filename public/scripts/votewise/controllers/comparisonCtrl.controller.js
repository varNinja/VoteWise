
var controllername = 'comparisonCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope']; // $routeParams '$rootscope'

    function controller($scope, $rootScope) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {
        };
        activate();


        $scope.questionSet = {}
        $scope.questionSet.question = 'We have branches of the armed forces designed for fast striking, air striking, sea striking, and ground striking. They are excellent at what they do. But we don’t have a branch of the armed forces that is designed for peace keeping - fighting more for the minds of the locals than the bodies. This is a very specialized task and requires specialized training in order to do it well. In addition, if we could have peacekeepers LOOK peaceful and have a level of separation from the branches that do all the killing, then they might be able to do a better job at being seen as people who are there to help. It makes sense, then, to create another branch of the military designed for peacekeeping.'

        $scope.questionSet.current = 1;
        $scope.questionSet.total = 20;

        $scope.checkboxClass = 0;
        console.log("inside comparisonCtrl")

        console.log($scope.questionSet.question);

        $scope.makeArrayFromDatabase = function(input){
            var myArray = []
            for (var i = 0; i < 6; i++){
                if (i == (input-1)){
                    myArray.push(true);
                } else {
                    myArray.push(false);
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
            var choice, differenceBetween, choice2, i, k
            for (var key in $scope.profileCompare){
                differenceBetween = 0;
                if ($scope.profileCompare.hasOwnProperty(key)){
                    for (i = 0, k = 0; i < 6; i++, k++){
                        if ($scope.currentUser.You.questionAnswer[i] == true){
                            choice = i;
                        } if ($scope.profileCompare[key].questionAnswer[k] == true){
                            choice2 = k;
                        }                        
                    } if (choice2 == choice) {
                        $scope.profileCompare[key].difference = "_0pcnt";
                    } else if (choice2 < choice) {
                        for (i = 0; i < 6; i++, choice2++, differenceBetween++){
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween, key) 
                                break 
                            }
                        }
                    } else if (choice < choice2) {
                        for (i = 0; i < 6; i++, choice++, differenceBetween++){
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween, key)
                                break 
                            }
                        }
                    }
                }
            }
        };

        // this function actually sets the difference property of each user's answer
        // to a string which is a css class. This is then binded in the HTML

        $scope.setColorDifference = function(differenceBetween, key){
            var setter = (differenceBetween*2).toString()
            $scope.profileCompare[key].difference = "_" + setter + "0pcnt";
        }
        
        //User objects iterated over
        $scope.currentUser = {
            You: {
                questionAnswer: [true, false, false, false, false, false],
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
