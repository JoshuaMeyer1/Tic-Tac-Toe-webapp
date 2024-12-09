<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <div class="tictactoe-board">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
          :class="{ occupied: cell }"
          @click="makeMove(index)"
        >
          {{ cell }}
        </div>
      </div>
      <p v-if="winner">{{ winnerMessage }}</p>
      <p v-if="draw">Cat's game! (draw)</p>
      <button class="close-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import { generateRandomMove, getBestMove, checkWinner, checkDraw } from "@/../moveGenerator.js"; // Import the functions

export default {
  name: "AppModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    gameMode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      board: Array(9).fill(null), // 3x3 board represented as an array
      currentPlayer: "X",
      winner: null,
      draw: false,
    };
  },
  computed: {
    winnerMessage() {
      return this.winner ? `${this.winner} wins!` : null;
    },
  },
  methods: {
    closeModal() {
      // Reset the board and close the modal
      this.board = Array(9).fill(null);
      this.currentPlayer = "X";
      this.winner = null;
      this.draw = false;
      this.$emit("close");
    },
    makeMove(index) {
      if (!this.board[index] && !this.winner) {
        this.board[index] = this.currentPlayer; //update the board
        if (this.checkWinner()) {
          this.winner = this.currentPlayer; // Declare winner
        } else if (this.checkDraw()) {
          this.draw = true; //set as draw
        } else {
          this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"; // Switch turn
        }
      }
    },

    // Use the checkWinner function from moveGenerator
    checkWinner() {
      return checkWinner(this.board);
    },
    checkDraw() {
      return checkDraw(this.board);
    },

    //gets the best move using moveGenerator
    makeAIMove() {
      if (this.currentPlayer === "O") {
        const bestMove = getBestMove(this.board, "O"); // Get the best move for O
        if (bestMove !== null) {
          this.board[bestMove] = "O"; // Apply the best move
          if (this.checkWinner()) {
            this.winner = "O"; // O wins
          } else {
            this.currentPlayer = "X"; // Switch to X
          }
        }
      }
    },

    //gets random move from moveGenerator
    makeRandomMove() {
      if (this.currentPlayer === "O") {
        const randomMove = generateRandomMove(this.board); // Get a random move for O
        if (randomMove !== null) {
          this.board[randomMove] = "O"; // Apply the random move
          if (this.checkWinner()) {
            this.winner = "O"; // O wins
          } else {
            this.currentPlayer = "X"; // Switch to X
          }
        }
      }
    },
  },
  watch: {
    // looks for changes in current player to detect when to make a move
    currentPlayer(newPlayer) {
      if (newPlayer === "O" && this.gameMode == "ai") {
        this.makeAIMove(); 
      }
      if (newPlayer === "O" && this.gameMode == "random") {
        this.makeRandomMove(); 
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #808080;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}
.tictactoe-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;
  margin: 20px auto;
}
.cell {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid #333;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: #5d697c;
  user-select: none;
}
.cell.occupied {
  cursor: not-allowed;
}
.close-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background: #303030;
  color: #a3a5a7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
