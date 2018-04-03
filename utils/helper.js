import React from "react"
import { View, StyleSheet, AsyncStorage } from "react-native"
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons"
import { black, white, red, orange, blue, lightPurp, pink } from "./colors"
import { Notifications, Permissions } from "expo"
export const NOTIFICATION_KEY = "GrumpyCards:notifications"

export function formatAllDecks(decks) {
  return decks.reduce((acc, deck) => {
    return {
      ...acc,
      [deck[0]]: {
        ...JSON.parse(deck[1])
      }
    }
  }, {})
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: "Study some more!",
    body: "👋 don't forget to study for your exams!",
    ios: {
      sound: true
    }
  }
}
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
