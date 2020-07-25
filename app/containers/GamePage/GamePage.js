/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Table, Alert, Button } from 'react-bootstrap';
import './GamePage.scss';

export default class GamePage extends React.Component {
  componentDidMount() {
    this.props.startGame('Easy');
  }

  render() {
    const { startGame, gameConfig, handleCellClick } = this.props;
    const handleSubmit = (event) => {
      const { value } = event.target;
      startGame(value);
    };

    const renderTable = () => {
      const rows = [];
      for (let rowIndex = 0; rowIndex < gameConfig.totalRows; rowIndex++) {
        const rowID = `row${rowIndex}`;
        const cell = [];
        for (let colIndex = 0; colIndex < gameConfig.totalCols; colIndex++) {
          const cellID = `cell${rowIndex}-${colIndex}`;
          cell.push(
            <td
              key={cellID}
              id={cellID}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <span>
                {gameConfig.fieldConfig[rowIndex] &&
                (gameConfig.fieldConfig[rowIndex][colIndex].text ||
                  gameConfig.fieldConfig[rowIndex][colIndex].text === 0) &&
                gameConfig.fieldConfig[rowIndex][colIndex].clicked
                  ? gameConfig.fieldConfig[rowIndex][colIndex].text
                  : ''}
              </span>
            </td>,
          );
        }
        rows.push(
          <tr key={rowIndex} id={rowID}>
            {cell}
          </tr>,
        );
      }
      return rows;
    };

    const renderAlert = () => {
      if (gameConfig.gameOver) {
        const variant = gameConfig.won ? 'success' : 'danger';
        const message = gameConfig.won
          ? 'Congratulations! You Won!'
          : 'Sorry! Game Over!';
        return (
          <section>
            <Alert variant={variant}>{message}</Alert>
            <Button onClick={() => startGame('Easy')}>Play Again</Button>
          </section>
        );
      }
      return null;
    };

    return (
      <section className="centered">
        <Row>
          <Col>
            <Form.Label>Difficulty</Form.Label>
            <Form.Control as="select" size="lg" onChange={handleSubmit}>
              <option selected={gameConfig.new}>Easy</option>
              <option>Medium</option>
              <option>Difficult</option>
            </Form.Control>
          </Col>
        </Row>
        <section className="centered">
          <Table bordered variant="dark">
            <tbody>{renderTable()}</tbody>
          </Table>
        </section>
        <section className="centered">{renderAlert()}</section>
      </section>
    );
  }
}

GamePage.propTypes = {
  startGame: PropTypes.func.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  gameConfig: PropTypes.object.isRequired,
};
