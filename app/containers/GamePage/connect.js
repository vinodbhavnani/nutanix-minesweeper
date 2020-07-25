/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { selectors, startGame, handleCellClick } from './reducers';
import GamePage from './GamePage';

export const mapStateToProps = (state) => {
  const gameConfig = selectors.gameConfig(state);
  return {
    gameConfig,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  startGame: (values) => {
    dispatch(startGame({difficulty : values}));
  },
  handleCellClick: (row, col) => {
    dispatch(handleCellClick({row, col}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
