import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

function NumCotainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numText}>{children}</Text>
    </View>
  );
}

export default NumCotainer;

const deviceWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accect500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numText: {
    color: Colors.accect500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: "bold",
  },
});
