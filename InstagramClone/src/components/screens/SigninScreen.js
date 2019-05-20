import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    AsyncStorage, 
    ActivityIndicator, 
} from 'react-native';
import axios from 'axios';
import { Font } from 'expo';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

class SigninScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            fontLoaded: false,
        }
    }

    // Make sure the font loaded before using
    async componentDidMount() {
        await Font.loadAsync({
           'Pacifico-Reg': require('../../../assets/fonts/Pacifico-Regular.ttf'), 
        });

        this.setState({ fontLoaded: true });
    }

    handleSignin = e => {
        e.preventDefault();

        if (!this.state.email || !this.state.password) {
            alert('Please enter email and password');
            return;
        }

        const userInfo = {
            email: this.state.email,
            password: this.state.password,
        };

        // frontend http call from cell phone expo, but server is on laptop. 
        // So the 'url': instead of using 'loclahost', should use laptop ip address
        axios
            .post('http://192.168.0.107:5000/signin', userInfo)
            .then(result => {
                const userID = result.data.user._id;
                
                if (userID) {
                    const user = {};
                    user.username = result.data.user.username;
                    user.email = result.data.user.email;
                    user.thumbnail = result.data.user.thumbnail;
                    user.userID = userID;
                    
                    AsyncStorage
                        .setItem('userToken', userID)
                        .then(action(res => {
                            globalStore.updateUser(user);
                            this.props.navigation.navigate('App');
                        }))
                        .catch(err => alert('Signin Error!'))
                } else {
                    alert('Error happens when try to sign you in! Please check email and password!');
                }    
            })
            .catch(err => {
                alert('Failed to sign you in! If you do not have an account, sign up first!');
                console.log(err);
            });

    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* App Header */}
                {this.state.fontLoaded ? (
                    <Text style={styles.header}>Instagram Clone</Text>    
                ) : (
                    <ActivityIndicator size="large" />
                )}

                <View style={styles.divider_bar}></View>

                {/* Sign In Form */}
                <TextInput
                    placeholder="Phone number or email"
                    value={this.state.username}
                    onChangeText={email => this.setState({email})}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    style={styles.input}
                />

                {/* Sign In Button */}
                <Text
                    onPress={this.handleSignin}
                    accessibilityLabel="Sign In"
                    style={styles.btn}
                >
                    Sign In
                </Text>

                <View style={styles.divider_bar}></View> 

                {/* Forgot Password link */}
                <Text>Forgot password?</Text>
            </View>
        );
    }
}

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        fontFamily: 'Pacifico-Reg',
        fontSize: 40,
        marginTop: 50,
    },
    divider_bar: {
        width: 350,
        backgroundColor: '#D3D3D3',
        height: 1,
        marginTop: 30,
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
        padding: 10,
        width: 350,
        marginBottom: 25,
        borderRadius: 10,
    },
    btn: {
        fontSize: 20,
        width: 350,
        backgroundColor: 'powderblue',
        textAlign: 'center',
        // borderRadius: 10,
        padding: 5,
    }
});