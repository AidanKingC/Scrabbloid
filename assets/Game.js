import { StyleSheet, View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import Input from "./Input";
import KeyBoard from "./KeyBoard";
import data from "./day1.json";

export default function Game() {
  const scrabblePoints = new Map([
    ["A", 1],
    ["B", 3],
    ["C", 3],
    ["D", 2],
    ["E", 1],
    ["F", 4],
    ["G", 2],
    ["H", 4],
    ["I", 1],
    ["J", 8],
    ["K", 5],
    ["L", 1],
    ["M", 3],
    ["N", 1],
    ["O", 1],
    ["P", 3],
    ["Q", 10],
    ["R", 1],
    ["S", 1],
    ["T", 1],
    ["U", 1],
    ["V", 4],
    ["W", 4],
    ["X", 8],
    ["Y", 4],
    ["Z", 10],
  ]);

  const [userCheck, setuserCheck] = useState(false);
  const [score, setScore] = useState(0);
  const [multiplierArray, setMultiplierArray] = useState(data.multiplierArray);

  const [letters, setLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState(
    data.avaliableLetters
  );

  function handleEnter() {
    setuserCheck(true);
  }

  useEffect(() => {
    setScore(0);
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === undefined) {
        return;
      } else {
        setScore(
          (prev) => prev + scrabblePoints.get(letters[i]) * multiplierArray[i]
        );
      }
    }
    if (userCheck) {
      console.log("Checking word");
      let word = letters.toString();
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.title === "No Definitions Found") {
            setScore(0);
            setAvailableLetters(data.avaliableLetters);
            setLetters([]);
            setuserCheck(false);
            console.log("No Definitions Found");
          } else {
            setScore(score);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [letters, userCheck]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scrabbloid{"\n"}Score: {score}</Text>
      <Input
        multiplierArray={multiplierArray}
        letters={letters}
        setAvailableLetters={setAvailableLetters}
        setLetters={setLetters}
        setScore={setScore}
      />
      <KeyBoard
        availableLetters={availableLetters}
        setAvailableLetters={setAvailableLetters}
        setLetters={setLetters}
        letters={letters}
        setScore={setScore}
        scrabblePoints={scrabblePoints}
      />
      <Button style={styles.enter} onPress={handleEnter} title="Enter" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#404040",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    textTransform: "uppercase",
    padding: 30,
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "monospace"
  },
  enter: {
    color: "#fff",
  },
});
