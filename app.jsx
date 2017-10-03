class Model {
  constructor() {
    this.index = 2;
    this.players = [{
      name: "Jim Hoskins",
      score: 31,
      id: 0,
    },
    {
      name: "Andree Hoskins",
      score: 35,
      id: 1,
    },
    {
      name: "Alena Hoskins",
      score: 42,
      id: 2,
    }];
    this.inputValue = null;
    this.callback = null;
    this.totalScore = 0;
  }
  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  addPlayer(name) {
    this.players.push(
      {
        name: name,
        score: 0,
        id: this.index + 1,
      }
    );
    this.notify();
  }

  calculateTotalScore() {
    this.totalScore = 0;
    for (let i = 0; i < this.players.length; i++) {
      this.totalScore += parseInt(this.players[i].score);
    }
    return this.totalScore;
  }

  addScore(id) {
    this.players[id].score++;
    this.notify();
  }

  dismissScore(id) {
    this.players[id].score--;
    this.notify();
  }

  calculatePlayers() {
    let numPlayers = this.players.length;
    return numPlayers;
  }

  updatePlayersList(index, player) {
    this.players[index] = player;
    this.notify();
  }

}

const App = ({ title, model }) => {
  const stopWatch = () => {
    let contador = 0;
    return (
      <div className="stopwatch container-fluid">
        <h2>STOPWATCH</h2>
        <p className="stopwatch-time">{contador}</p>

        <div className="row">
          <div className="col-md-6">
            <button>START</button>
          </div>
          <div className="col-md-6">
            <button>RESET</button>
          </div>
        </div>
      </div>

    );
  }

  const Header = () => {
    return (
      <div className="header" >
        <div className="stats">
          <tr><td>PLAYERS:</td><td>{model.calculatePlayers()}</td></tr>
          <tr><td>TOTAL POINTS:</td><td> {model.calculateTotalScore()}</td></tr>
        </div>
        {stopWatch()}
      </div>
    );
  }


  const getPlayersList = () => {

    return model.players.map((player, index) => {
      //console.log(index);
      return (
        <li key={index}>
          <div className="player">
            <p className="player-name ">{player.name}</p>
            <div className="counter">
              <button onClick={() => model.dismissScore(index)} className=" counter-action decrement btn-danger">-</button>
              <p className="counter-score">{player.score}</p>
              <button onClick={() => model.addScore(index)} className="counter counter-action increment btn-success">+</button>
            </div>
          </div>
        </li >

      );
    });
  }


  const PlayerList = ({ players }) => {
    // console.log("hola");
    return (
      <div>
        <ul>{getPlayersList(players)}</ul>
      </div>
    );
  }

  const PlayerForm = () => {
    return (
      <div className="add-player-form">
        <form onSubmit={e => {
          e.preventDefault();
          model.addPlayer(model.inputValue);
        }}
        >
          <input type="text" laceholder="Enter a name" onChange={e => (model.inputValue = e.target.value)} />
          <button type="submit" >ADD PLAYER</button>
        </form>
      </div>
    );
  }

  return (
    <div className="scoreboard">
      <Header />
      <PlayerList />
      <PlayerForm />
    </div>
  );



}

let model = new Model();
let counter = 1;
let render = () => {
  //console.log('render times: ', counter++);
  ReactDOM.render(
    <App title="Scoreboard" model={model} />,
    document.getElementById('container')
  );
};

model.subscribe(render);
render(); 