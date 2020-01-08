var app = angular.module('app', []);

app.factory('recognizeService', function ($http) {
    return {
        recognize: function (imgLink) {

            var url = 'https://recognizeface.azurewebsites.net/api/HttpTrigger1';
            // console.log(url);
            var headers = {
                // 'Authorization': 'Basic ' + btoa(username + ":" + password),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                "X-Requested-With": "XMLHttpRequest"
            }
            // var url = 'http://localhost:2468/';
            return $http({
                method: 'POST',
                url,
                // withCredentials: true,
                headers: headers,
                data: JSON.stringify({
                    "url": `${imgLink}`
                })
            }).catch(function (e) {
                console.log(e)
            });
        }
    }
});

app.controller('mainCtrl', function ($scope, recognizeService) {
    $scope.isLoading = false;
    $scope.imageLink = "http://4.bp.blogspot.com/-_-zawEr1Wec/UA5NJ2omJ6I/AAAAAAAABrg/NpMsrElZkPQ/s640/midu-3.JPG";
    $scope.imageA = 2;

    $scope.$watch('imageLink', function (oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    // Gọi hàm này khi người dùng click button "Nhận diện"
    $scope.recognize = function () {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        // Gọi hàm recognize của service
        recognizeService.recognize($scope.imageLink).then(result => {
            $scope.faces = result.data;
            // Dựa vào kết quả trả về để set style động cho class idol-face
            $scope.faceDisplay = result.data.map(rs => {
                return {
                    style: {
                        top: rs.face.top + 'px',
                        left: rs.face.left + 'px',
                        width: rs.face.width + 'px',
                        height: rs.face.height + 'px'
                    },
                    name: rs.dv.name
                }
            });
            $scope.isLoading = false;
        });
    }
    $scope.addImage = function (imageA) {
        $scope.imageLink = $scope.testImages[imageA];
    }

    // Danh sách ảnh để test
    $scope.testImages = [
        "http://4.bp.blogspot.com/-_-zawEr1Wec/UA5NJ2omJ6I/AAAAAAAABrg/NpMsrElZkPQ/s640/midu-3.JPG",
        "http://img-us.24hstatic.com/upload/4-2015/images/2015-12-30/1451469179-1451447040-miu-le--5-.jpg",
        "http://static.english.vov.vn/h500/uploaded/wzzqbijjvws/2016_12_27/Chi_Pu_6_GYKX.jpg",
        "http://media-cache-ec0.pinimg.com/736x/91/21/fb/9121fbdfb94a7cefdb0c178fa966e261.jpg",
        "http://vietnamguides.abstravel.asia/wp-content/uploads/2015/10/angela-phuong-trinh-6-abstravel.asia_.jpg"
    ];

    // Danh sách idol
    $scope.idols = [
        "Midu",
        "Miu Lê",
        "Chi Pu",
        "Khả Ngân",
        "Angela Phương Trinh"
    ];
});