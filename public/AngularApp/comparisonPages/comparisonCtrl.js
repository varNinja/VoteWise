app.controller('ComparisonCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside ComparisonCtrl");


    $scope.set = {}
    $scope.set.question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus metus urna. Vivamus sit amet mi eros. Cras fermentum enim eros, ac sodales lectus gravida ac. Nullam ex magna, luctus non massa id, aliquet blandit felis. Nulla dapibus non tellus ut finibus. Donec tristique tristique interdum.';
    $scope.set.topic = "privacy";
    $scope.set.current = 1;
    $scope.set.total = 20;

    $scope.makeArray = function(input){
        var myArray = []
        for (var i = 0; i < 6; i++){
            if (i != (input-1)){
                myArray.push(false);
                console.log(myArray);
            } else if (i == input-1){
                myArray.push(true);
                console.log(myArray);
            }
            }
    }

    $scope.checkboxClass = 0;

    $scope.$watch('profileCompare', function(newVal, oldVal){
        for(var i=0; i< newVal.length; i++){
            if (i == 0){
                $scope.checkboxClass = "_100pcnt"
            } else if (i == 1){
                $scope.checkboxClass = "_80pcnt"
            } else if (i == 2){
                $scope.checkboxClass = "_60pcnt"
            } else if (i == 3){
                $scope.checkboxClass = "_40pcnt"
            } else if (i == 4){
                $scope.checkboxClass = "_20pcnt"
            } else if (i == 5){
                $scope.checkboxClass = "_0pcnt"
            }
        }
    });

    $scope.importanceEnum = function(input){
        importance = "";
        if (input == 1){
            importance = "Unimportant";
        } else if( input == 2){
            importance = "Important";
        } else if (input == 3){
            importance = "Very Important";
        }
    }

    $scope.answerQuestion = function (){
    }

    $scope.importance = function (){
        console.log("$scope.question.importance: " + $scope.question.importance)
        console.log("question stance: " + $scope.question.stance);
    }

    $scope.setImportance = function(input){
        $scope.question.importance = input;
        console.log($scope.question.importance);
    }

    $scope.currentUser = {
        You: {
            questionAnswer: [false, true, false, false, false, false],
            percent: ['0%', '20%', '40%', '60%', '80%', '100%'],
            questionImportance: "Unimportant",
            match: "30%"
        }
    };

    $scope.profileCompare = {

        Pizza: {
            name: "Pizza",
            questionAnswer: [false, false, false, false, false, true],
            percent: ['0%', '20%', '40%', '60%', '80%', '100%'],
            questionImportance: "Important",
            match: "30%",
            office: "Cheese"

        },
        GreenieBigNameGuy: {
            name: "Greenie Centipede",
            questionAnswer: [false, false, false, false, true, false],
            percent: ['0%', '20%', '40%', '60%', '80%', '100%'],
            questionImportance: "Very Important",
            match: "40%",
            office: "Green Beans"
        },
        Red: {
            name: "Seeing Red",
            questionAnswer: [false, false, false, true, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "milk"
        },
        Yellow: {
            name: "Christmas Tree",
            questionAnswer: [false, false, true, false, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "Elf"
        },
        Yellow2: {
            name: "Buffalo Bill",
            questionAnswer: [false, true, false, false, false, false],
            questionImportance: "Not Important",
            match: "100%", 
            office: "grass"
        },
        Yellow3: {
            name: "Ice Cream",
            questionAnswer: [false, false, true, false, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "ping pong"
        },
        Yellow4: {
            name: "Antelope",
            questionAnswer: [false, false, false, true, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "sneezing"
        },
        Yellow5: {
            name: "Boa Boa Boa",
            questionAnswer: [false, true, false, false, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "Squirly Things"
        },
        Yellow6: {
            name: "Screw",
            questionAnswer: [false, false, true, false, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "upside down"
        },
        Yellow7: {
            name: "Rainbow",
            questionAnswer: [false, false, false, false, true, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "ghost"
        },
        Yellow33: {
            name: "Bugs",
            questionAnswer: [false, true, false, false, false, false],
            questionImportance: "Not Important",
            match: "100%",
            office: "pokemon"
        }



    };

    $scope.generateMatchPercent = function(user, politician){

    }

    // $scope.profileCompare1 = [{
    //     name: 'You',
    //     stats: {
    //         questionAnswer: [false, true, false, false, false, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Unimportant"
    //     }
    // }, {
    //     name: 'Pizza',
    //     stats: {
    //         questionAnswer: [true, false, false, false, false, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Very important"
    //     }
    // }, {
    //     name: 'Greenie',
    //     stats: {
    //         questionAnswer: [false, true, false, false, true, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Important"
    //     }
    // }];

    $scope.issues = {
        thing: {
            name: "cheese"
        },
        thing2: {
            name: "cheese"
        },
        thing3: {
            name: "cheese"
        }
    }

    console.log(JSON.stringify($scope.profileCompare));

    /**
     * List a set of categories. Have one of these for each category.
     * @Usage: 0 = Unchecked, 1 = Checked
     * @Example: $scope.aCategories.catOne = 1; // Returns True
     */
    $scope.aCategories = {
        catOne: 0,
        catTwo: 0,
        catThr: 0,
        catFou: 0
    };

    /**
     * How much does the voter care about this category?
     * @Example: $scope.aImportance.0;  // User strongly Disagrees
     */
    $scope.aImportance = {
        stronglyDisagree: 0,  // Maroon
        disagree:         1,  // Red
        neutral:          2,  // Orange
        agree:            3,  // Lt. Green
        stronglyAgree:    4   // Agree
    };


    // Have one of these for each politican in the database
    // Ex: Two people in here
    // This is dummy data. You only need one politician object
    $scope.politicans = [
        {
            essay:        true,
            resume:       true,
            endorsements: true
        },
        {
            essay:        false,
            resume:       false,
            endorsements: false
        }
    ];


    $scope.getPoliticians = function () {
        for (var i = 0; i < $scope.politican.length; i++){
            // Loop through politicians here
        }
    };

});


