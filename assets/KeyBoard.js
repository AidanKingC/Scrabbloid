import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function KeyBoard({
  availableLetters,
  setAvailableLetters,
  setLetters,
  scrabblePoints,
}) {
  function handlePress(letter, index) {
    setAvailableLetters((prev) => {
      const newLetters = [...prev];
      newLetters.splice(index, 1);
      setLetters((prev) => prev + letter);
      return newLetters;
    });
  }

  const letterList = availableLetters.map((letter, index) => {
    return (
      <TouchableOpacity
        style={styles.letterBox}
        key={index}
        onPressOut={() => handlePress(letter, index)}
      >
        <Text style={styles.points}>{scrabblePoints.get(letter)}</Text>
        <Text style={styles.kb}>{letter}</Text>
      </TouchableOpacity>
    );
  });

  return <View style={styles.container}>{letterList}</View>;
}

const styles = StyleSheet.create({
  letterBox: {
    display: "flex",
    width: 50,
    height: 50,
    backgroundColor: "#505050",
    margin: 5,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  points: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 1,
    color: "#fff",
    textAlign: "right",
    fontSize: 10,
    fontWeight: "bold",
  },
  kb: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
});
