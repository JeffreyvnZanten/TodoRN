import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#007AFF",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    height: 60,
    flexDirection: "column",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});
