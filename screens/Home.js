import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import Questions from "./Questions";
import { Link } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/pablo.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.welcome}>Pablo Camara</Text>
        <Text style={styles.paragraph}>
          QUIZ APP FOR TEST
        </Text>
        <Link to={`Questions`} style={styles.button} underlayColor="#f0f4f7">
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Ionicons name="md-play" size={32} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: 10,
                marginTop: 5
              }}
            >
              Start Quiz
            </Text>
          </View>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#3498db",
    color: "white",
    padding: 10
  },

  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});
