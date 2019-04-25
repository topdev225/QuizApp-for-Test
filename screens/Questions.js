import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Button
} from "react-native";
import { Link } from "react-router-native";
import Question from "../components/Question";

export default class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      questions: [],

      current: 0,
      correctScore: 5,
      totalScore: 50,
      timer: 0,

      results: {
        score: 0,
        correctAnswers: 0,
        elapsedTime: null
      },
      completed: false
    };
  }

  fetchQuestions = async () => {
    await this.setState({ loading: true });
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=medium`
    );
    const questions = await response.json();

    const { results } = questions;

    results.forEach(item => {
      item.id = Math.floor(Math.random() * 10000);
    });

    await this.setState({ questions: results, loading: false });
  };

  reset = () => {
    this.setState(
      {
        timer: 0,
        questions: [],
        current: 0,
        results: {
          score: 0,
          correctAnswers: 0,
          elapsedTime: null
        },
        completed: false
      },
      () => {

        this.fetchQuestions();
      }
    );
  };

  submitAnswer = (index, answer) => {
    const question = this.state.questions[index];
    const isCorrect = question.correct_answer === answer;
    const results = { ...this.state.results };

    results.score = isCorrect ? results.score + 5 : results.score;
    results.correctAnswers = isCorrect
      ? results.correctAnswers + 1
      : results.correctAnswers;

    results.elapsedTime += this.state.timer;
    this.setState({
      timer: 0,
      current: index + 1,
      results,
      completed: index === 9 ? true : false
    });
  };
  startTimer() {
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer + 1 })),
      1000
    );
  }
  
  componentDidMount() {  
    this.fetchQuestions();
    this.startTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.loading && (
          <View style={styles.loadingQuestions}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Please wait while we are loading questions for you</Text>
          </View>
        )}

        {!!this.state.questions.length > 0 &&
          this.state.completed === false && (
            <Question
              onSelect={answer => {
                this.submitAnswer(this.state.current, answer);
              }}
              question={this.state.questions[this.state.current]}
              correctPosition={Math.floor(0.9379294002485218 * 3)}
              current={this.state.current}
            />
          )}

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {this.state.completed === true && (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 25 }}>Quiz Completed</Text>
              <Text>Amount of Time: {this.state.results.elapsedTime+" seconds"}</Text>
              <Text>Total Score: {this.state.results.correctAnswers*5+"/"+50}</Text>
              <Button title="Play again" onPress={this.reset} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%"
  },

  loadingQuestions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
