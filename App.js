import React from 'react';
import { StyleSheet, Text, View,StatusBar, Platform,Animated,Easing } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import DeckList from './components/DeckList'
import {createStore, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import {white, purple} from './utils/colors'
import DeckAdd from './components/DeckAdd'
import CardAdd from './components/CardAdd'
import CardQuiz from './components/CardQuiz'
import DeckDetail from './components/DeckDetail'
import {Ionicons,Entypo, FontAwesome} from '@expo/vector-icons'
import thunk from 'redux-thunk';
import{setLocalNotification} from './utils/helper'


const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions : {
      title:'Decks',
      tabBarLabel: 'Decks',
      tabBarIcon : ({tintColor}) => <Ionicons name='ios-folder' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: DeckAdd,
    navigationOptions : {
      title: 'Add Deck',
      tabBarLabel: 'Add Deck',
      headerTransparent:false,
      tabBarIcon : ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }

},{

  tabBarOptions:{

    style : {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail:{
    screen: DeckDetail,

  },
  CardAdd:{
    screen:CardAdd,
    navigationOptions:{
      title:'New Card'
    }

  },
  CardQuiz:{
    screen:CardQuiz,
    navigationOptions:{
      title:'Quiz',
    }

  }

},
{
  transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose

const store = createStore(
  reducer,
  composeEnhancers(
  applyMiddleware(thunk)
)
)

export default class App extends React.Component {
  componentDidMount (){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
      <View style={{flex: 1}}>

        <View style={{backgroundColor:white,height: Constants.statusBarHeight}}>
          <StatusBar translucent backgroundColor={white} barStyle='dark-content'/>
        </View>


        <MainNavigator/>
      </View>
    </Provider>
    );
  }
}
