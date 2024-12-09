<template>
    <div class="about-page">
        <h1>About:</h1>
        <p>
            Welcome to my Tic Tac Toe App! This app allows you to play Tic Tac Toe in three modes:
        </p>
            <li>Against a perfectly playing computer</li>
            <li>Against randomly generated moves</li>
            <li>Against a friend by taking turns on choosing squares</li>
        <p>
            The computer opponent uses the minimax algorithm to generate the best move in any position. <br> 
            It doesn't feature optimizations such as alpha beta pruning in the search tree, but  this is  <br>unnecessary for a standard 3x3 game. <br><br><br>
            
            Developed by <strong>Joshua Meyer</strong> in 2024
        </p>
    </div>
</template>
  
<script>
    export default {
        name: "AppAbout",
    };
</script>
  
<style scoped>
    .about-page {
        background-color: #213d4d;
        text-align: center;
        font-family: Arial, sans-serif;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .about-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .about-page h1 {
        color: #e2e2e2;
        font-size: 2.5em;
    }

    .about-page p {
        color: #b3b3b3;
        font-size: 1.2em;
        margin: 20px 0;
    }

    .about-page ul {
        list-style-type: disc;
        padding: 0;
        margin: 20px 0;
        text-align: left;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .about-page li {
        color: #b3b3b3;
        font-size: 1.1em;
        margin: 10px 0;
        text-align: center;
    }
</style>
  