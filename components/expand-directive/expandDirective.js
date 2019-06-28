
function expandComponent() {
    const ctrl = this;

    // $scope.$watch($attrs.count, function(value) {
    //     height = value;
    //     console.log(value);
    // });


            return {
                restrict: "A",
                link: function($scope, $element, $attrs) {
                    let height = 80;
                    let shrink = "auto";

                    
                    // $scope.$watch($attrs.count, function(value) {
                    //     height = value;
                    //     console.log(value);
                    // });




                        $element.on("click", function() {
                            $element.css({
                                "height": height + "vh",
                                "transition": "3s"
                            });

                            // $(`.fullview`).css("display","block");

                        });


                        // $element.on("click", () => {
                        //     $element.css("height", "14px");
                        // });


                    



                    

      
                }
                
            };   
};

angular.module("HikingApp").directive("expandComponent", expandComponent);
