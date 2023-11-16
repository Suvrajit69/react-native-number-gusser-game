import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import StartGame from "./screens/StartGame";
import Game from "./screens/Game";
import { Colors } from "./constants/colors";
import GameOver from "./screens/GameOver";

export default function App() {
  const [userNum, setuserNum] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumHandler = (pickedNum) => {
    setuserNum(pickedNum);
    setGameIsOver(false);
  };

  const gameOverHandler = (numOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numOfRounds);
  };

  const startNewGameHandler = () => {
    setuserNum(null);
    setGuessRounds(0);
  };

  let screen = <StartGame onPickNum={pickedNumHandler} />;

  if (userNum) {
    screen = <Game userNum={userNum} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNum) {
    screen = (
      <GameOver
        userNum={userNum}
        roundsNum={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accect500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImg}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImg: {
    opacity: 0.15,
  },
});
