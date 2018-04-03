import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  FlatList,
  Button
} from "react-native"
import { connect } from "react-redux"
import { white, purple } from "../utils/colors"
import TextButton from "./TextButton"
import { NavigationActions } from "react-navigation"

class CardQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = { showAnswer: false }
  }
  // Here is the meat of it, this is how you get a dynamic title.

  goNextCard = answer => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "CardQuiz",
        params: {
          title: this.props.currIndex,
          deckName: this.props.deckName,
          currIndex: this.props.currIndex + 1,
          correct: answer ? this.props.correct + 1 : this.props.correct,
          deckHome: this.props.deckHome,
          firstQuestion:
            this.props.currIndex === 0
              ? this.props.navigation.state.key
              : this.props.firstQuestion
        }
      })
    )
  }
  goHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: "Home" }),
          NavigationActions.navigate({
            routeName: "DeckDetail",
            key: this.props.deckHome,
            params: { entryId: this.props.deckName }
          })
        ]
      })
    )
  }

  goFirst = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: "Home" }),
          NavigationActions.navigate({
            routeName: "DeckDetail",
            key: this.props.deckHome,
            params: { entryId: this.props.deckName }
          }),
          NavigationActions.navigate({
            routeName: "CardQuiz",
            params: {
              title: 0,
              deckName: this.props.deckName,
              currIndex: 0,
              correct: 0,
              deckHome: this.props.deckHome
            }
          })
        ]
      })
    )
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  render() {
    const { card } = this.props
    return (
      <View style={styles.container}>
        {this.props.finalCard && (
          <View style={styles.container}>
            <Text style={styles.header}>Result</Text>
            <Text style={styles.header}>
              {Math.round(this.props.correct / this.props.deckSize * 100)}%
              correct
            </Text>
            <TextButton
              style={[styles.button, { backgroundColor: "#007aff" }]}
              onPress={this.goFirst}>
              Restart Quiz
            </TextButton>
            <TextButton
              style={[styles.button, { backgroundColor: "#007aff" }]}
              onPress={this.goHome}>
              Back to Deck
            </TextButton>
          </View>
        )}
        {!this.props.finalCard && (
          <View style={styles.container}>
            <View style={{ alignSelf: "flex-start" }}>
              <Text style={styles.header3}>
                {this.props.currIndex + 1 + "/" + this.props.deckSize}
              </Text>
            </View>
            <View style={styles.container}>
              <View>
                <Text style={styles.header}>
                  {!this.state.showAnswer && card.name}
                  {this.state.showAnswer && card.answer}
                </Text>
                <TextButton style={styles.button2} onPress={this.toggleAnswer}>
                  {!this.state.showAnswer && "View Answer"}
                  {this.state.showAnswer && "View Question"}
                </TextButton>
              </View>
              <View>
                <TextButton
                  style={[styles.button, { backgroundColor: "#4cd964" }]}
                  onPress={() => this.goNextCard(true)}>
                  Correct
                </TextButton>
                <TextButton
                  style={[styles.button, { backgroundColor: "#ff3b30" }]}
                  onPress={() => this.goNextCard(false)}>
                  Incorrect
                </TextButton>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: white
  },
  header: {
    fontSize: 35,
    textAlign: "center"
  },
  header2: {
    paddingTop: 20,
    fontSize: 35,
    textAlign: "center",
    color: "#A9A9A9"
  },
  header3: {
    fontSize: 15
  },
  button: {
    padding: 15,

    overflow: "hidden",
    borderRadius: 30,

    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontSize: 30
  },
  button2: {
    padding: 15,

    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#007aff",
    fontSize: 20
  },
  folderIcon: {
    flex: 1,
    paddingLeft: 10
  },
  folderMetaData: {
    flex: 6,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  innerFolder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: white
  },
  folderName: {
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  folderOptions: {
    paddingRight: 15
  }
})

function mapStateToProps(state, { navigation }) {
  const {
    deckName,
    currIndex,
    correct,
    deckHome,
    firstQuestion
  } = navigation.state.params
  let finalCard = state[deckName].cards.length === currIndex
  return {
    finalCard,
    deckName,
    currIndex,
    correct,
    deckHome,
    firstQuestion,
    deckSize: state[deckName].cards.length,
    card: state[deckName].cards[currIndex]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  //const {entryId} = navigation.state.params

  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CardQuiz)
