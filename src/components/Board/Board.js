import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Board.css';
import Cell from '../../components/Cell';

function getInitialBoard() {
  const board = [];
  board[0] = [undefined, undefined, undefined];
  board[1] = [undefined, undefined, undefined];
  board[2] = [undefined, undefined, undefined];
  return board;
}

class Board extends React.Component {
  static propTypes = {
    xPiece: PropTypes.string,
    oPiece: PropTypes.string,
  };

  static defaultProps = {
    xPiece: 'x',
    oPiece: 'o',
  };

  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
    };

    // Inital board verbose for better understanding
    this.state.board = getInitialBoard();
  }

  handleClick(row, col) {
    this.setState(prevState => {
      const { xPiece, oPiece } = this.props;
      const board = prevState.board.slice();

      if (board[row][col] === undefined) {
        const piece = prevState.turn % 2 === 1 ? xPiece : oPiece;
        board[row][col] = piece;
        return { board, turn: prevState.turn + 1 };
      }

      return prevState;
    });
  }

  handleReset = () => {
    this.setState({ turn: 0, board: getInitialBoard() });
  };

  render() {
    const cells = [0, 1, 2].map(row =>
      [0, 1, 2].map(col => (
        <Cell
          key={`${row}-${col}`}
          onClick={() => this.handleClick(row, col)}
          piece={this.state.board[row][col]}
        />
      )),
    );

    return (
      <div className={s.root}>
        <div onClick={this.handleReset}>Reset</div>
        <div className={s.scoreboard}> turn: {this.state.turn} </div>
        <div className={s.scoreboard}>
          board: {this.state.board.toString()}{' '}
        </div>
        {cells}
      </div>
    );
  }
}

export default withStyles(s)(Board);
