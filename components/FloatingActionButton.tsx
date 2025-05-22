import { Pressable, StyleSheet, Text } from "react-native";

type FloatingActionButtonProps = {
  handlePress?: () => void;
};

export default function FloatingActionButton(props: FloatingActionButtonProps) {
  return (
    <Pressable
      onPress={() => {
        props.handlePress?.();
      }}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#007AFF",
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    position: "absolute",
    bottom: 60,
    right: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
