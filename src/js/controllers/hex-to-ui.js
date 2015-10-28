var app = angular.module('controllers.hextoui', ['ngRoute', 'ui.bootstrap', 'colorpicker.module']);

app.controller("HexToUICtrl", function(appConfig, $scope, $filter, $rootScope) {

    $scope.title = "HEX to UIColor Converter";

    // Roll Tide
    $scope.hexValid = true;
    $scope.alphaValid = true;
    $scope.alphaInput = "1.0";
    $scope.alpha = "1.0";


    function convertHexToRgb(hex) {
        var r = (parseInt(hex.substring(0,2), 16)/255).toFixed(2);
        var g = (parseInt(hex.substring(2,4), 16)/255).toFixed(2);
        var b = (parseInt(hex.substring(4,6), 16)/255).toFixed(2);

        console.log(hex);

        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            var tempHex = "#" + hex;
            $scope.style =  { bgColor: tempHex };

            $rootScope.$broadcast('ColorChanged', tempHex);

            $scope.hexValid = true;
            $scope.uiColor = {
                "r": r,
                "g": g,
                "b": b,
            };
            console.log(r + " " + g + " " + b);
        } else {
            $rootScope.$broadcast('ColorChanged', appConfig.themePrimary);
            $scope.hexValid = false;
            console.log("Invalid.");
        }

        console.log("--------------");
    }

    $scope.hexToRgb = function(hex) {
        hex = hex.replace('#','');
        if (hex.length == 3) {
            var tempHex = hex + hex.charAt(2) + hex.charAt(1) + hex.charAt(0);
            convertHexToRgb(tempHex);
        } else if (hex.length == 6) {
            convertHexToRgb(hex);
        } else {
            $scope.hexValid = false;
            $rootScope.$broadcast('ColorChanged', appConfig.themePrimary);
        }
    };

    $scope.alphaChanged = function(alpha) {
        if (!isNaN(alpha)) {
            if ((alpha >=0) && (alpha <=1)) {
                console.log("Yes");
                $scope.alphaValid = true;

                if ((alpha == "1") || (alpha == "0")) {
                    $scope.alpha = alpha + ".0";
                } else {
                    $scope.alpha = alpha;
                }
            } else {
                console.log("ERROR");
                $scope.alpha = "1.0";
                $scope.alphaValid = false;
            }
        } else {
            console.log("ERROR");
            $scope.alpha = "1.0";
            $scope.alphaValid = false;
        }

        if (!alpha.length) {
            $scope.alpha = "1.0";
        }
        updateCopyText();
    };

    $scope.$watch('hex', function(hex, oldval){
        if (hex) {
            $scope.hexToRgb(hex);
            updateCopyText();
        } else {
            $rootScope.$broadcast('ColorChanged', appConfig.themePrimary);
        }
    }, true);

    function updateCopyText() {
        $scope.copyObjectiveC = "/// Returns a color object whose RGB values are " + $scope.uiColor.r + ", " + $scope.uiColor.g + " and " + $scope.uiColor.b + "and whose alpha value is " + $scope.alpha + "." + "\n"
        					+ "///" + "\n"
        					+ "/// @return The UIColor object." + "\n"
        					+ "[UIColor colorWithRed:" + $scope.uiColor.r + " green:" + $scope.uiColor.g + " blue:" + $scope.uiColor.b + " alpha:" + $scope.alpha + "];";
        $scope.copySwift = "/// Returns a color object whose RGB values are " + $scope.uiColor.r + ", " + $scope.uiColor.g + " and " + $scope.uiColor.b + "and whose alpha value is " + $scope.alpha + "." + "\n"
        					+ "///" + "\n"
        					+ "/// - Returns: The UIColor object." + "\n"
        					+ "UIColor(red:" + $scope.uiColor.r + ", green:" + $scope.uiColor.g + ", blue:" + $scope.uiColor.b + ", alpha:" + $scope.alpha + ")";
    }


});