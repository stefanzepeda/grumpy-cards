Grumpy Cards!


This is the final project for the Udacity React Nanodegree with React Native.
My project was inspired in the Dropbox App with minimalist screens.

The project shows a welcome screen inviting the user to create his/her first deck!


The project uses:

React Native for iOS, project was specific for iOS.
Redux for state management
Thunk for middleware handling and writing to AsyncStorage, makes implementation cleaner.


Components:

-CardAdd: Component that allows for an entry screen to add a card. Implements some simple validation to make sure inputs are clean.

-CardQuiz: Dynamic component to support the quiz function of the app. The component navigates to itself passing navigation params. Todo in the future is to include redux in the mix.

-DeckAdd: Main component to add a new Deck. Implemented in a tab navigation, has validation to not duplicate decks and allows quick enter.

-DeckDetail: Main component to view a deck. The component will show the number of cards, a button to add cards and if there are any cards present it will show the start quiz button.

-DeckList: Main component to render the list of decks. Since the implementation was small, I embedded a function to render each deck. This could be broken into components but it was easier this way for me.

-TextButton: Auxiliary component to render a quick button.


Reducers:

-reducers: Only 5 actions so all reducers were kept on this file.

Utils:

-api.js: Helper file to have all calls to AsyncStorage, these functions are called from thunk applyMiddleware

-colors.js: handy colors

-helper.js: Functions to help with local notifications and handy functions.


Actions:

-Index.js: Keeps all middleware and final action creators in this file.
