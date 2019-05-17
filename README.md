# Instagram_clone
This is a Instagram clone app build with the MERN stack.
* React Native, Mobx
* MongoDB, Mongoose, Express
* Express-session, passport, bcrypt

Problems:
1. Data structure for FriendRequests
2. Implement FriendRequests status on Frontend
3. Integrate Mobx into React Native app with Expo and React Navigation
    * yarn add mobx mobx-react
    * yarn add babel-plugin-transform-decorators-legacy
    * Open `babel config` (.babelrc in the root folder) and edit it like this:
    ```
        {
            "presets": ["babel-preset-expo"],
            "plugins": [
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        "legacy": true
                    }
                ]
            ]
        }
    ```
    Ref: https://itnext.io/easily-integrate-mobx-into-react-native-app-with-expo-and-react-navigation-29ecf7c14012
4. 

