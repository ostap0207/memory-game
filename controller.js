function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function gameController($scope, $timeout) {
    $scope.images = ["img/1.png", "img/2.png", "img/3.png", "img/4.jpg"];
    $scope.results = [];
    $scope.cheking = false;

    $scope.init = function () {
        $scope.board = [];
        $scope.deck = [];
        $scope.first = null;
        $scope.second = null;
        $scope.clicks = 0;
    }

    $scope.startGame = function () {
        $scope.init();
        var startX = 10;
        var startY = 10;
        var width = 150;
        var height = 150;
        var gap = 10;
        var uid = 0;


        var cards = [];
        for (var j = 0; j < 2; j++) {
            for (var i in $scope.images) {
                card = new Object();
                card.id = uid++;
                card.img = $scope.images[i];
                cards.push(card);
            }
        }

        shuffle(cards);
        var row1 = [];
        for (i = 0; i < cards.length / 2; i++) {
            cell = cards[i];
            cell.top = startY;
            cell.left = startX + i * (width + gap);
            row1.push(cell);
        }
        ;

        var row2 = [];
        for (i = 0; i < cards.length / 2; i++) {
            cell = cards[cards.length / 2 + i];
            cell.top = startY + height + gap;
            cell.left = startX + i * (width + gap);
            row2.push(cell);
        }
        ;

        $scope.board.push(row1);
        $scope.board.push(row2);
    }

    $scope.isInDeck = function (img) {
        for (var i in $scope.deck) {
            if ($scope.deck[i].img == img)
                return true;
        }
        ;
        return false;
    }

    $scope.onCellClick = function (cell) {
        if ($scope.cheking) return;

        if ($scope.first == null) {
            $scope.first = cell;
            $scope.clicks++;
        } else if ($scope.first.id != cell.id) {
            $scope.second = cell;
            $scope.clicks++;
        }

        if ($scope.first != null && $scope.second != null) {
            $scope.cheking = true;
            $timeout(function () {
                if ($scope.first.img == $scope.second.img) {
                    $scope.deck.push($scope.first);
                }
                $scope.first = null;
                $scope.second = null;
                $scope.cheking = false;
                if ($scope.deck.length == $scope.images.length) {
                    var name = prompt("You won","Your name");
                    if (name != null) {
                        $scope.saveResult(name,$scope.clicks);
                    }
                }
            }, 800);

        }
    }

    $scope.saveResult = function(name,score){
        result = new Object();
        result.player = name;
        result.score = score;
        $scope.playerName = "";
        $scope.clicks = 0;
        $scope.results.push(result);
    }
}