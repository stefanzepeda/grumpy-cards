import { AsyncStorage } from "react-native"
import { NOTIFICATION_KEY, formatAllDecks } from "./helper"

export function getDecks() {
  return AsyncStorage.getAllKeys()
    .then(keys => {
      return AsyncStorage.multiGet(
        keys.filter(key => {
          return key !== NOTIFICATION_KEY
        })
      )
    })
    .then(formatAllDecks)
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    title,
    JSON.stringify({
      title: title,
      cards: []
    })
  )
}

export function addCardToDeck(card, deckName, cards) {
  debugger
  return AsyncStorage.mergeItem(
    deckName,
    JSON.stringify({
      cards: [...cards, card]
    })
  )
}

export function removeDeck(title) {
  return AsyncStorage.removeItem(title)
}

export function getDeck(title) {
  return AsyncStorage.getItem(title).then(results => {
    return {
      ...JSON.parse(results)
    }
  })
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  })
}

export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults)
}
