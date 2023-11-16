import { View, Text, Pressable, StyleSheet } from "react-native";
import {Colors} from "../constants/colors"

function PrimaryBtn({ children, onPress }) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        android_ripple={{ color: Colors.primary600 }}
        style={({ pressed }) =>
          pressed
            ? [styles.btnInnerContainer, styles.pressed]
            : styles.btnInnerContainer
        }
        onPress={onPress}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryBtn;

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 9.5,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    fontSize: 18,
    color: Colors.primary800,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
