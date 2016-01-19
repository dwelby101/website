
angular.module('inputTable', ['smart-table'])

.directive('theInputTable', function() {
    return {
        restrict: 'E',
        templateUrl: 'inputTable.tpl.html',
        scope: {
            newData: "="
        },
        controller: function ($scope) {
            $scope.rowCollection = [
                {date: new Date(), url: 'http//:davidwelby.com', response: 200, id:0},
                {date: new Date(), url: 'http//:davidwelby.com/ncctest', response: 150,id:1}
            ];

            //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
            $scope.displayedCollection = [].concat($scope.rowCollection);

            $scope.input = {date: "", url:"http://", response:0};


            //add to the real data holder
            $scope.addData = function() {
                //add the new table object
                $scope.rowCollection.push({date: $scope.input.date,url:$scope.input.url,response:$scope.input.response, id:$scope.newData.length});
                //update the chart data
                $scope.newData.push({ val_0:$scope.input.response,
                    x:$scope.newData.length});
                //refresh object holder
                $scope.input = {date: "", url:"http://", response:0};
            };

            //remove to the real data holder
            $scope.removeItem = function removeItem(row) {
                var index = $scope.rowCollection.indexOf(row);
                if (index !== -1) {
                    $scope.rowCollection.splice(index, 1);
                    $scope.newData.splice(index,1);
                }
            }

            $scope.sorters = {
                url: function(value){
                    return value.url.length;
                }
            }

        }
    }
});
