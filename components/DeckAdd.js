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
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native"
import { connect } from "react-redux"
import { white, purple } from "../utils/colors"
import { addDeck, addDeckAsync } from "../actions"
import { NavigationActions } from "react-navigation"

class DeckAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { deckName: "" }
  }
  handleSubmit = () => {
    //validate deck uniqueness
    if (!Object.keys(this.props.decks).includes(this.state.deckName)) {
      Keyboard.dismiss
      const deckTemp = this.state.deckName
      this.props.addDeck(this.state.deckName).then(() => {
        this.toHome(deckTemp)
      })
      this.textInput.clear()
      this.setState({ deckName: "" })
    } else {
      Alert.alert(
        "Duplicate Deck",
        "A deck with this name already exists 😩",
        [{ text: "Try Again", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      )
    }
  }
  toHome = newDeckName => {
    Keyboard.dismiss
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: "Home" }),
          NavigationActions.navigate({
            routeName: "DeckDetail",
            params: { entryId: newDeckName }
          })
        ]
      })
    )
  }
  componentWillUnMount = () => {
    Keyboard.dismiss()
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.entryContainer}>
              <View>
                <TextInput
                  ref={input => {
                    this.textInput = input
                  }}
                  style={styles.header}
                  onChangeText={text => this.setState({ deckName: text })}
                  value={this.state.deckName}
                  onSubmitEditing={this.handleSubmit}
                  placeholder="What's the title of the new Deck?"
                  maxHeight={40}
                />
              </View>
            </View>
            {this.state.deckName !== "" && (
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
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
                    Create Deck
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  entryContainer: {
    flex: 1,
    marginTop: 20,
    height: 40
  },
  header: {
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  fill: {
    ...StyleSheet.absoluteFillObject
  },
  subContainer: {
    width: 300,
    justifyContent: "center",
    backgroundColor: "#ffffff"
  }
})
function mapStateToProps(state, ownProps) {
  return {
    decks: state,
    deckName: ownProps.deckName
  }
}
const mapDispatchToProps = dispatch => ({
  addDeck: deckName => dispatch(addDeckAsync(deckName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd)
