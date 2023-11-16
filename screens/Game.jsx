import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  FlatList,
} from "react-native";

import Title from "../components/Title";
import NumCotainer from "../components/game/NumCotainer";
import PrimaryBtn from "../components/PrimaryBtn";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumBtw = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumBtw(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const Game = ({ userNum, onGameOver }) => {
  const initialGuess = generateRandomNumBtw(minBoundary, maxBoundary, userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNum) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNum, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNum) ||
      (direction === "greater" && currentGuess > userNum)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNum = generateRandomNumBtw(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setGuessRounds((prev) => [newRndNum, ...prev]);
  };

  const guessRoundListLength = guessRounds.length;

  let content = (
    <>
      <NumCotainer>{currentGuess}</NumCotainer>
      <Card>
        <InstructionText style={styles.instructionTextStyle}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={() => nextGuessHandler("lower")}>-</PrimaryBtn>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={() => nextGuessHandler("greater")}>
              +
            </PrimaryBtn>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 412) {
    content = (
      <>
        <View style={styles.btnsContainerWide}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={() => nextGuessHandler("lower")}>-</PrimaryBtn>
          </View>
          <NumCotainer>{currentGuess}</NumCotainer>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={() => nextGuessHandler("greater")}>
              +
            </PrimaryBtn>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.screen, {paddingBottom: 0}]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound =>(
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNum={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 45,
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    flex: 1,
  },
  instructionTextStyle: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
