import * as GrumpyAPIUtil from "../utils/api";
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'

export function addDeck(deckName){
  return {
    type: ADD_DECK,
    deckName,
  }
}

export function addCard(card,deckName){
  return {
    type: ADD_CARD,
    card,
    deckName,
  }
}

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function receiveDeck(deck){
  return {
    type: RECEIVE_DECK,
    deck,
  }
}

export function deleteDeck(deckName){
  return {
    type: DELETE_DECK,
    deckName,
  }
}

export const fetchDecks = () => dispatch =>
  GrumpyAPIUtil.getDecks()
  .then(decks =>
    dispatch(receiveDecks(decks))
  );

  export const addDeckAsync = deckName => dispatch =>
    GrumpyAPIUtil.saveDeckTitle(deckName)
    .then(() => dispatch(addDeck(deckName)));

    export const removeDeckAsync = deckName => dispatch =>
      GrumpyAPIUtil.removeDeck(deckName)
      .then(() => dispatch(deleteDeck(deckName)));

      export const saveCardAsync = (card,deckName,cards) => dispatch =>
        GrumpyAPIUtil.addCardToDeck(card,deckName,cards)
        .then(() => dispatch(addCard(card,deckName)));

        export const getDeckAsync = (deckName) => dispatch =>
          GrumpyAPIUtil.getDeck(deckName)
          .then((deck) => dispatch(receiveDeck(deck)));
