/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { original } from 'immer';

function mineRadar(fieldConfig, rowIndex, cellIndex, totalRows, totalColumns) {
  const row=rowIndex;
  const col=cellIndex;
  let mineCount = 0;
  if (!(row - 1 < 0)) {
    if (fieldConfig[row - 1][col]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(row + 1 > totalRows - 1)) {
    if (fieldConfig[row + 1][col]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(col - 1 < 0)) {
    if (fieldConfig[row][col - 1]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(col - 1 < 0) && !(row - 1 < 0)) {
    if (fieldConfig[row - 1][col - 1]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(col + 1 > totalColumns - 1)) {
    if (fieldConfig[row][col + 1]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(col + 1 > totalColumns - 1) && !(row + 1 > totalRows - 1)) {
    if (fieldConfig[row + 1][col + 1]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(col + 1 > totalColumns - 1) && !(row - 1 < 0)) {
    if (fieldConfig[row - 1][col + 1]?.text === "BOOM!") {
      mineCount++;
    }
  }
  if (!(row + 1 > totalRows - 1) && !(col - 1 < 0)) {
    if (fieldConfig[row + 1][col - 1]?.text === "BOOM!") {
      mineCount++;
    }
  }

  return mineCount;
}

const game = createSlice({
  name: 'Game',
  initialState: {
    difficulty: 'Easy',
    totalRows: 10,
    totalCols: 10,
    numberOfMines: 10,
    fieldConfig: {},
    gameOver: false,
    overturned: 0,
    won: false,
    new: true,
  },
  reducers: {
    startGame: (state, action) => {
      const DIFFICULTY = action.payload.difficulty;
      const TOTALROWS = 10;
      const TOTALCOLS = 10;
      const TOTALMINES = DIFFICULTY === 'Easy' ? 10 : DIFFICULTY === 'Medium' ? 20 : 30;
      const fieldConfig = {};

      // Set initial field config
      for(let rowIndex = 0; rowIndex < TOTALROWS; rowIndex++){
        const arr = [];
        for(let colIndex = 0; colIndex < TOTALROWS; colIndex++){
          arr.push({
            text: 0,
            clicked: false,
          })
        }
        fieldConfig[rowIndex] = arr;
      }

      // Set mines in field at random positions
      for(let mineCount = 0; mineCount < TOTALMINES; ){
        const row = Math.floor(Math.random() * TOTALROWS);
        const col = Math.floor(Math.random() * TOTALCOLS);
        if(fieldConfig[row][col]?.text !== 'BOOM!'){
          fieldConfig[row][col] = {
            text: 'BOOM!',
            clicked: false,
          };
          mineCount++;
        }
      }
      
      return {
        difficulty: DIFFICULTY,
        totalRows: TOTALROWS,
        totalCols: TOTALCOLS,
        numberOfMines: TOTALMINES,
        fieldConfig,
        gameOver: false,
        overturned: 0,
        won: false,
        new: true,
      }   
    },

    handleCellClick: (state, action) => {
      const {row, col} = action.payload;
      const { fieldConfig, totalRows, totalCols, difficulty, overturned } = original(state);
      const modifiedFieldConfig = JSON.parse(JSON.stringify(fieldConfig));
      const cellsToWin = difficulty === 'Easy' ? 90 : difficulty === 'Medium' ? 80 : 70;

      // If clicked on mine, then finish game and show all mines
      if(fieldConfig[row][col]?.text === 'BOOM!') {
        Object.keys(modifiedFieldConfig).forEach((key) => {
          modifiedFieldConfig[key].map((cell, index) => {
            if(cell.text === 'BOOM!') {
              modifiedFieldConfig[key][index].clicked = true;
            }
            return true;
          })
        })

        return {
          ...state,
          gameOver: true,
          won: false,
          fieldConfig: {...modifiedFieldConfig},
        }
      }

      // Call mineRadar method to calculate all adjacent mines
      const mineCount = mineRadar(fieldConfig, row, col, totalRows, totalCols)

      // Reveal adjacent mines
      modifiedFieldConfig[row][col] = {
        text: mineCount,
        clicked: true,
      };

      if(overturned + 1 < cellsToWin) {
        return {
          ...state,
          fieldConfig: {...modifiedFieldConfig},
          overturned: overturned + 1,
          new: false,
        }
      } 
      return {
        ...state,
        fieldConfig: {...modifiedFieldConfig},
        overturned: overturned + 1,
        gameOver: true,
        won: true,
        new: false,
      }
      
    },
  }
})

export const selectors = {
  gameConfig: (state) => state.game,
};

export const { startGame, handleCellClick } = game.actions;

export default game.reducer;
  
