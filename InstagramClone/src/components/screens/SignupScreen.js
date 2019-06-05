import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,  
    ActivityIndicator,
 } from 'react-native';
 import axios from 'axios';
 import { Font } from 'expo';

 // import ROOT_URL from '../../../utils/config';

class SignupScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            rePassword: '',
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

    handleSignUp = () => {
        // e.preventDefault();

        if (!this.state.email || !this.state.password || !this.state.rePassword) {
            alert('All fields are required');
            return;
        }

        if (this.state.password !== this.state.rePassword) {
            alert('Passwords do not match. Please try again');
        } else {
            const userInfo = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            };

            // frontend http call from cell phone expo, but server is on laptop. 
            // So the 'url': instead of using 'loclahost', should use laptop ip address
            axios
                .post('http://192.168.0.107:5000/signup', userInfo)
                .then(result => {
                    this.props.navigation.navigate('SignIn');
                })
                .catch(err => {
                    alert('Failed to sign you up! If you already have an account, log in directly!');
                    console.log(err);
                });

        }

        this.setState({
            email: '',
            username: '',
            password: '',
            rePassword: '',
        });
    }

    navigateToSignin = () => {
        this.props.navigation.navigate('SignIn');
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

                {/* Sign Up Form */}
                <TextInput
                    placeholder="Phone number or email"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    style={styles.input}
                />

                <TextInput
                    placeholder="User name"
                    value={this.state.username}
                    onChangeText={username => this.setState({username})}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Re-enter password"
                    value={this.state.rePassword}
                    onChangeText={rePassword => this.setState({rePassword})}
                    style={styles.input}
                />

                {/* Sign Up Button */}
                <View style={styles.btn}>
                    <Text
                        onPress={this.handleSignUp}
                        accessibilityLabel="Sign up"
                        style={styles.btnText}
                    >
                        Sign Up
                    </Text>
                </View>
                

                <View style={styles.divider_bar}></View> 

                {/* Log In */}
                <Text
                    onPress={this.navigateToSignin}
                    accessibilityLabel="Link to Sign In page"
                >
                    Already have an account? Log In
                </Text>
            </View>
        );
    }
}

export default SignupScreen;

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
        width: 350,
        backgroundColor: '#009FF8',
        marginTop: 25,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        width: 300,
        color: '#fff',
    }
});