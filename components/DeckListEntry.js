import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native"
import { white, purple, lightBlue } from "../utils/colors"
import { Ionicons, Entypo } from "@expo/vector-icons"

export default function DeckListEntry({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.folderIcon}>
        <Ionicons name="ios-folder" color={lightBlue} size={35} />
      </View>
      <View style={styles.folderMetaData}>
        <View style={styles.innerFolder}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("DeckDetail", { entryId: title })
            }>
            <View style={styles.folerName}>
              <Text style={{ fontSize: 15 }}>{title}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.folderOptions}>
            <Entypo name="dots-three-horizontal" color="#7e7e7e" size={15} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white
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
