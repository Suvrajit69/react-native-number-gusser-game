import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/Title";
import { Colors } from "../constants/colors";
import PrimaryBtn from "../components/PrimaryBtn";

const GameOver = ({ roundsNum, userNum, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;
  let topMargin = 100;

  if (width > 412) {
    imageSize = 150;
    topMargin = 0;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.rootContainer, { marginTop: topMargin }]}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNum}</Text>{" "}
          rounds to guess <Text style={styles.highlight}>{userNum}</Text>
        </Text>
        <PrimaryBtn onPress={onStartNewGame}>Start New Game</PrimaryBtn>
      </View>
    </ScrollView>
  );
};

export default GameOver;

// const deviceWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    // fontFamily: "d",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
