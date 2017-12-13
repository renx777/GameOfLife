var k;

var Cell = React.createClass({
  displayName: "Cell",

  //   set initial size of the board
  getInitialState: function getInitialState() {
    return {
      row: 65,
      col: 65,
      initialRender: 0,
      generations: 0,
      clearingBoard: 0,
      gameStarted: 0
    };
  },
  handleClick: function handleClick(evt) {
    var id = evt.target.id.split(" ");
    var i = parseInt(id[0]);
    var j = parseInt(id[1]);

    $("#0 0").css("backround", "pink");
    var newBoard = this.state.BoardState;

    if (newBoard[i][j] == 0) {
      newBoard[i][j] = 1;
    } else {
      newBoard[i][j] = 0;
    }

    this.setState({
      BoardState: newBoard,
      generations: this.state.generations - 1
    });
  },
  handleStart: function handleStart() {

    k = setInterval(this.handleGame, 300);
  },
  handlePause: function handlePause() {
    clearInterval(k);
  },
  handleGame: function handleGame() {

    var currentB = this.state.BoardState;
    var nextGen = [];
    var r = this.state.row;
    var c = this.state.col;
    function find(z, x) {
      var len;
      if (x == "i") {
        len = c;
      }
      if (x == "j") {
        len = r;
      }

      if (z < 0) {
        z = z % len + r;
      }

      if (z >= r) {
        z = Math.abs(z) % len;
      }

      return z;
    }
    function conway(y) {

      var arr = y.slice(0);

      var ngen = [];

      for (var i = 0; i < r; i++) {
        var ab = [];
        for (var j = 0; j < c; j++) {
          ab.push(0);
        }
        ngen.push(ab);
      }

      for (var i = 0; i < r; i++) {
        for (var j = 0; j < c; j++) {
          var sum = 0;

          var a = find(i - 1, "i");
          var b = find(j - 1, "j");
          sum += arr[a][b];

          var a = find(i, "i");
          var b = find(j - 1, "j");
          sum += arr[a][b];

          var a = find(i + 1, "i");
          var b = find(j - 1, "j");
          sum += arr[a][b];

          var a = find(i - 1, "i");
          var b = find(j, "j");
          sum += arr[a][b];

          var a = find(i, "i");
          var b = find(j, "j");
          sum += arr[a][b];

          var a = find(i + 1, "i");
          var b = find(j, "j");
          sum += arr[a][b];

          var a = find(i - 1, "i");
          var b = find(j + 1, "j");
          sum += arr[a][b];

          var a = find(i, "i");
          var b = find(j + 1, "j");
          sum += arr[a][b];

          var a = find(i + 1, "i");
          var b = find(j + 1, "j");
          sum += arr[a][b];

          if (sum == 3) {
            ngen[i][j] = 1;
            var elem = document.getElementById(i + " " + j);
            elem.style.background = "red";
          } else if (sum == 4) {

            ngen[i][j] = arr[i][j];
          } else {

            ngen[i][j] = 0;
          }
        }
      }

      nextGen = ngen.slice(0);
    }

    conway(currentB);

    this.setState({
      BoardState: nextGen
    });
  },
  handleClear: function handleClear() {
    this.handlePause();
    this.setState({
      generations: 0

    });
    var board = [];
    for (var i = 0; i < 80; i++) {
      var dummy = [];
      for (var j = 0; j < 80; j++) {
        dummy.push(0);
      }
      board.push(dummy);
    }

    this.setState({
      BoardState: board
    });
  },
  handleSizeA: function handleSizeA() {
    this.handlePause();
    this.setState({
      row: 30,
      col: 30
    });

    var board = [];
    for (var i = 0; i < 30; i++) {
      var dummy = [];
      for (var j = 0; j < 30; j++) {
        dummy.push(Math.random() < 0.85 ? 0 : 1);
      }
      board.push(dummy);
    }

    this.setState({
      BoardState: board
    });

    this.handleStart();
  },
  handleSizeB: function handleSizeB() {

    this.handlePause();
    this.setState({
      row: 50,
      col: 50
    });

    var board = [];
    for (var i = 0; i < 50; i++) {
      var dummy = [];
      for (var j = 0; j < 50; j++) {
        dummy.push(Math.random() < 0.85 ? 0 : 1);
      }
      board.push(dummy);
    }

    this.setState({
      BoardState: board
    });

    console.log(this.state.BoardState);

    this.handleStart();
  },
  handleSizeC: function handleSizeC() {
    this.handlePause();
    this.setState({
      row: 80,
      col: 80
    });
    console.log(this.state.row + " " + this.state.col);
    var board = [];
    for (var i = 0; i < 80; i++) {
      var dummy = [];
      for (var j = 0; j < 80; j++) {
        dummy.push(Math.random() < 0.85 ? 0 : 1);
      }
      board.push(dummy);
    }

    this.setState({
      BoardState: board
    });

    console.log(this.state.BoardState);

    this.handleStart();
  },
  componentWillMount: function componentWillMount() {
    var board = [];
    for (var i = 0; i < this.state.row; i++) {
      var dummy = [];
      for (var j = 0; j < this.state.col; j++) {
        dummy.push(Math.random() < 0.85 ? 0 : 1);
      }
      board.push(dummy);
    }

    this.setState({
      BoardState: board
    });
  },
  render: function render() {
    //     increment generations after every render
    if (this.state.initialRender == 0) {
      this.handleStart();
      this.setState({
        initialRender: 1
      });
    }

    if (this.state.generations > 0) {}

    this.state.generations += 1;

    //     reset board


    var Board = [];
    var bState = this.state.BoardState;

    for (var i = 0; i < this.state.row; i++) {
      for (var j = 0; j < this.state.col; j++) {
        var style = {
          height: "11px",
          width: "11px",

          display: "inline-block",
          border: "1px solid #222"
        };

        if (bState[i][j] == 0) {
          style.background = "black";
        }
        if (bState[i][j] == 1) {
          style.background = "pink";
        }

        Board.push(React.createElement("div", { onClick: this.handleClick, style: style, id: i + " " + j }));
      }

      Board.push(React.createElement(
        "div",
        { id: "hide" },
        "i"
      ));
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "topBoard" },
        React.createElement(
          "button",
          { onClick: this.handleStart },
          "Start"
        ),
        React.createElement(
          "button",
          { onClick: this.handlePause },
          "Pause"
        ),
        React.createElement(
          "button",
          { onClick: this.handleClear },
          "Clear"
        ),
        React.createElement(
          "span",
          { id: "gen" },
          " Generations: ",
          this.state.generations - 1
        )
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "div",
        { id: "board" },
        Board
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "div",
        { id: "bottomBoard" },
        React.createElement(
          "span",
          null,
          "Change Size :"
        ),
        React.createElement(
          "button",
          { onClick: this.handleSizeA },
          "30 X 30"
        ),
        React.createElement(
          "button",
          { onClick: this.handleSizeB },
          "50 X 50"
        ),
        React.createElement(
          "button",
          { onClick: this.handleSizeC },
          "80 X 80"
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Cell, null), document.getElementById("app"));