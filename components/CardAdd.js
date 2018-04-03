import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from "react-native"
import { connect } from "react-redux"
import { white, purple } from "../utils/colors"
import DeckListEntry from "./DeckListEntry"
import { saveCardAsync } from "../actions"
import { NavigationActions } from "react-navigation"

class CardAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", answer: "" }
  }
  handleSubmit = () => {
    if (this.state.name !== "" && this.state.answer !== "") {
      this.props.addCard(
        this.state.name,
        this.state.answer,
        this.props.deckName,
        this.props.cards
      )
      this.state = { name: "", answer: "" }
      this.textInput.clear()
      this.toHome()
    } else {
      Alert.alert(
        "Incomplete information",
        "You must enter a question and answer! 😩",
        [{ text: "Try Again", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      )
    }
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={80}>
        <View style={styles.entryContainer}>
          <View>
            <TextInput
              ref={input => {
                this.textInput = input
              }}
              style={styles.header}
              onChangeText={text => this.setState({ name: text })}
              autoFocus={true}
              multiline={false}
              value={this.state.name}
              placeholder="Enter a question!"
            />
            <TextInput
              ref={input => {
                this.textInput = input
              }}
              style={styles.header}
              onChangeText={text => this.setState({ answer: text })}
              multiline={true}
              value={this.state.answer}
              placeholder="Enter the question's answer"
            />
          </View>

          <View
            style={{
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingBottom: 20
            }}>
            <Text
              onPress={this.handleSubmit}
              style={{
                textAlign: "right",
                color: "#696969",
                paddingRight: 10
              }}>
              Done
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: white
  },
  entryContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "space-between"
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})
function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params
  return {
    deckName: deckName,
    cards: state[deckName].cards
  }
}
const mapDispatchToProps = dispatch => ({
  addCard: (name, answer, deckName, cards) =>
    dispatch(saveCardAsync({ name: name, answer: answer }, deckName, cards))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardAdd)
