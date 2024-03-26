import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Input({
  multiplierArray,
  letters,
  setAvailableLetters,
  setLetters,
}) {
  function handlePress(letter, index) {
    console.log(letter);
    if (letter == undefined) {
      return;
    } else {
        setAvailableLetters((prev) => [...prev, letter]);
        setLetters((prev) => prev.slice(0, index) + prev.slice(index + 1));
    }
  }

  const inputBoxes = multiplierArray.map((answer, index) => {
    // pick colors for the background of each box based on the multiplier, grey for 1, blue for 2, and red for 3
    let color;
    if (answer === 1) {
      color = "#505050";
    } else if (answer === 2) {
      color = "#0000FF";
    } else {
      color = "#FF0000";
    }
    return (
      <TouchableOpacity
        key={index}
        onPressOut={() => handlePress(letters[index], index)}
      >
        <Text style={[styles.answerBox, {backgroundColor: color}]}>{letters[index]}</Text>
      </TouchableOpacity>
    );
  });

  return <View style={styles.container}>{inputBoxes}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    flexDirection: "row",
    justifyContent: "center",
  },
  answerBox: {
    width: 50,
    height: 50,
    margin: 5,
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
});
