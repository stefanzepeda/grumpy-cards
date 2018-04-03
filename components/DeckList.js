import React, { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  FlatList,
  ActionSheetIOS,
  Keyboard,
  Image
} from "react-native"
import { connect } from "react-redux"
import DeckListEntry from "./DeckListEntry"
import { white, purple, lightBlue } from "../utils/colors"
import { Ionicons, Entypo } from "@expo/vector-icons"
import { removeDeckAsync, fetchDecks } from "../actions"

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks()
  }
  renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("DeckDetail", { entryId: item.title })
      }>
      <View style={styles.containerCard}>
        <View style={styles.folderIcon}>
          <Ionicons name="ios-folder" color={lightBlue} size={35} />
        </View>
        <View style={styles.folderMetaData}>
          <View style={styles.innerFolder}>
            <View style={styles.folerName}>
              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              <Text style={{ fontSize: 15 }}>
                {item.cards && item.cards.length} cards
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ["Cancel", "Delete"],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  buttonIndex => {
                    if (buttonIndex === 1) {
                      this.props.deleteDeck(item.title)
                    }
                  }
                )
              }>
              <View style={styles.folderOptions}>
                <Entypo
                  name="dots-three-horizontal"
                  color="#7e7e7e"
                  size={15}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
  componentWillMount() {
    Keyboard.dismiss()
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.decks && this.props.decks.length > 0 ? (
          <FlatList data={this.props.decks} renderItem={this.renderCard} />
        ) : (
          <View style={styles.container}>
            <Image
              style={{
                width: 166,
                height: 158,
                alignSelf: "center",
                marginTop: 50
              }}
              source={{
                uri:
                  "https://images-na.ssl-images-amazon.com/images/I/51sk2JBRP1L.png"
              }}
            />
            <Text style={styles.header}>Having fun with no decks?</Text>
            <Text style={styles.header2}>Add one below</Text>
          </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  containerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    paddingTop: 20,
    fontSize: 35,
    textAlign: "center"
  },
  header2: {
    fontSize: 35,
    textAlign: "center",
    paddingTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
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
  return {
    decks: Object.keys(state)
      .filter(key => {
        return key !== ""
      })
      .map(deck => {
        return {
          key: deck,
          ...state[deck]
        }
      })
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDeck: deckName => dispatch(removeDeckAsync(deckName)),
  fetchDecks: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
