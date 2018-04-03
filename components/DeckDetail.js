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
import { clearLocalNotifications, setLocalNotification } from "../utils/helper"
import { connect } from "react-redux"
import { white, purple } from "../utils/colors"
import TextButton from "./TextButton"
import { NavigationActions } from "react-navigation"
import { getDeckAsync } from "../actions"

class DeckDetail extends Component {
  componentDidMount() {

    this.props.getDeck(this.props.entryId)
  }
  goAddCard = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "CardAdd",
        params: { deckName: this.props.deck.title }
      })
    )
  }
  startQuiz = () => {
    //unsubscribe me because now I studied today
    clearLocalNotifications().then(setLocalNotification)
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "CardQuiz",
        params: {
          deckName: this.props.deck.title,
          currIndex: 0,
          correct: 0,
          deckHome: this.props.navigation.state.key
        }
      })
    )
  }
  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{deck.title}</Text>
          <Text style={styles.header2}>{deck.cards.length} cards</Text>
        </View>

        <View>
          <TextButton style={styles.button} onPress={this.goAddCard}>
            Add Card
          </TextButton>
          {deck.cards &&
            deck.cards.length > 0 && (
              <TextButton style={styles.button} onPress={this.startQuiz}>
                Start Quiz
              </TextButton>
            )}
        </View>
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
  button: {
    padding: 15,

    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#007AFF",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontSize: 30
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
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck: state[entryId]
  }
}
const mapDispatchToProps = dispatch => ({
  getDeck: title => dispatch(getDeckAsync(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
