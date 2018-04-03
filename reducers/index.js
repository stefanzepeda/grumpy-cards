import {
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
  RECEIVE_DECKS,
  RECEIVE_DECK
} from "../actions"

function entries(state = {}, action) {
  const { deckName, card, decks, deck } = action

  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [deckName]: {
          title: deckName,
          cards: []
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [deckName]: {
          ...state[deckName],
          cards: [...state[deckName].cards, card]
        }
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...decks
      }
    case RECEIVE_DECK:
      return {
        ...state,
        [deck.title]: {
          ...deck
        }
      }
    case DELETE_DECK:
      const { [deckName]: deleted, ...noDeck } = state
      return { ...noDeck }

    default:
      return state
  }
}

export default entries
