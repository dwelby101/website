
angular.module('nccTest', ['n3-line-chart','inputTable'])
    .controller('nccController', function($scope) {

        var colors = d3.scale.category10();

        $scope.newData = {arr:[{ val_0:200,x:0},{ val_0:150,x:1}]};
        $scope.data = $scope.newData.arr;


        $scope.options = {axes: {x:{type:'linear',key:'x', ticks:0} , y: {min: 0, max: 1000}},
            series: [{y: 'val_0',
                        label: 'Toggle Chart',
                        color: colors(2),
                        axis:'y',
                        type: 'column'}],
            lineMode: 'linear',
            tooltip: {mode: 'scrubber',
                        formatter: function(x,y,series){
                            return "test"+x+ " : " + y + ' ms';
                        }}};

    });