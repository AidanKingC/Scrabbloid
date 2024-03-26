import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Game from "./assets/Game";

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  
});
