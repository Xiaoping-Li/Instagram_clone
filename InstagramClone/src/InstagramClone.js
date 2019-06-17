import React, {Component} from 'react';

import { 
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import { 
  WelcomeScreen, 
  HomeScreen, 
  AddPostScreen, 
  ProfileScreen, 
  SearchScreen,
  LikesScreen, 
  SignInScreen,
  SignUpScreen,
  AuthLoadingScreen,
  FriendStatusScreen,
  RequestsScreen,
  FriendsScreen,
} from './components/screens';

import Icon from '@expo/vector-icons/Ionicons';


export default class InstagramClone extends Component {
  render() {
      return <AppContainer />;
  }
}

// Nest another stackNavigator inside HomeTabNavigator
const PostsStackNavigator = createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'Home',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10}}
              onPress={() => navigation.openDrawer()} 
              name="md-menu" 
              size={30} 
            />
          )
        }  
      } 
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false   // drawerNavigator only open the drawer
    }
  }
);

const SearchStackNavigator = createStackNavigator(
  {
    Search: { 
      screen: SearchScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'Search',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10}}
              onPress={() => navigation.openDrawer()} 
              name="md-menu" 
              size={30} 
            />
          )
        }  
      } 
    },

    FriendStatus: {
      screen: FriendStatusScreen,
      /**With the code below, won't show the back arrow to search list */
      // navigationOptions: ({navigation}) => {
      //   return {
      //     headerLeft: (
      //       <Icon
      //         style={{ paddingLeft: 10}}
      //         onPress={() => navigation.openDrawer()} 
      //         name="md-menu" 
      //         size={30} 
      //       />
      //     )
      //   }  
      // } 
    }
  },
);


const AddPostStackNavigator = createStackNavigator(
  {
    AddPost: { 
      screen: AddPostScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'AddPost',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10}}
              onPress={() => navigation.openDrawer()} 
              name="md-menu" 
              size={30} 
            />
          )
        }  
      } 
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false   // drawerNavigator only open the drawer
    }
  }
);

const LikesStackNavigator = createStackNavigator(
  {
    Likes: { 
      screen: LikesScreen,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'Likes',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10}}
              onPress={() => navigation.openDrawer()} 
              name="md-menu" 
              size={30} 
            />
          )
        }  
      } 
    },
  },
);

const ProfileTopTabNavigator = createMaterialTopTabNavigator(
  {
    Profile: { screen: ProfileScreen },
    Friends: { screen: FriendsScreen },
    Requests: { screen: RequestsScreen },
  },
  {
    navigationOptions: ({navigation}) => {
      // Get the route name for each tab and set the route name as the header title
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    },
  }, 
);

const ProfileStackNavigator = createStackNavigator(
  {
    PersonProfile: { 
      screen: ProfileTopTabNavigator,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'Profile',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10}}
              onPress={() => navigation.openDrawer()} 
              name="md-menu" 
              size={30} 
            />
          )
        }  
      } 
    },
  },
);


// TabNavigator nested inside HomeStackNavigator,
// HomeStackNavigator nested inside AppDrawerNavigator,
// AppDrawerNavigator nested inside AppSwitchNavigator,
const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: PostsStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="md-home"
            color={tintColor}
            size={30} 
          />
        )
      })
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="md-search"
            color={tintColor}
            size={30} 
          />
        )
      }) 
    },
    AddPost: {
      screen: AddPostStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="md-add"
            color={tintColor}
            size={30} 
          />
        )
      })
    },
    Likes: {
      screen: LikesStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="ios-heart-empty"
            color={tintColor}
            size={30} 
          />
        )
      })
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="md-person"
            color={tintColor}
            size={30} 
          />
        )
      })
    },
  },
  {
    navigationOptions: ({navigation}) => {
      // Get the route name for each tab and set the route name as the header title
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        // get rid of the back arrow under the header of PostsStackNavigator
        header: null,
        headerTitle: routeName
      };
    },
    tabBarOptions: {
      showLabel: false,
      // activeTintColor: '#000000',
      // inactiveTintColor: '#586589',
      // style: {
      //   backgroundColor: '#171F33',
      // }
    }
  }, 
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: HomeTabNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10}}
            onPress={() => navigation.openDrawer()} 
            name="md-menu" 
            size={30} 
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
  },
  Search: {
    screen: SearchStackNavigator,
  },
  Posts: {
    screen: AddPostStackNavigator,
  },
  Likes: {
    screen: LikesStackNavigator,
  },
  Profile: {
    screen: ProfileStackNavigator,
  },
});


const AuthStackNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App:  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);


