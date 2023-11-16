import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import PrimaryBtn from "../components/PrimaryBtn";
import { Colors } from "../constants/colors";
import Title from "../components/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGame = ({ onPickNum }) => {
  const [enterdNum, setEnterdNum] = useState("");

  const { width, height } = useWindowDimensions();

  const numInputHandler = (text) => {
    setEnterdNum(text);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enterdNum);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number should be number between 1 and 99",
        [{ text: "Okay", style: "default", onPress: setEnterdNum("") }]
      );
      return;
    }
    onPickNum(chosenNumber);
  };

  const marginTopLie = height > 390 ? 120 : 52;
  //  console.log(marginTopLie);
  //  console.log(height);
  return (
    <ScrollView style={styles.scree}>
    <KeyboardAvoidingView style={styles.scree} behavior="position">
      <View style={[styles.rootContainer, { marginTop: marginTopLie }]}>
        <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter a number</InstructionText>
          <TextInput
            style={styles.numInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numInputHandler}
            value={enterdNum}
          />
          <View style={styles.btnsContainer}>
            <View style={styles.btnContainer}>
              <PrimaryBtn onPress={() => setEnterdNum("")}>Reset</PrimaryBtn>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryBtn onPress={confirmInputHandler}>Confirm</PrimaryBtn>
            </View>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGame;

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  scree:{
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
  numInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accect500,
    borderBottomWidth: 2,
    color: Colors.accect500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});
