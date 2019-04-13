import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    AsyncStorage, 
    ActivityIndicator, 
} from 'react-native';
import { Font } from 'expo';

class SigninScreen extends Component {
    constructor() {
        super();
        this.state = {
        username: '',
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


    signIn = async () => {
        await AsyncStorage.setItem('userToken', 'xiaoping');
        this.props.navigation.navigate('App');
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
                    onChange={username => this.setState({username})}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    onChange={password => this.setState({password})}
                    style={styles.input}
                />

                {/* Sign In Button */}
                <Text
                    onPress={this.signIn}
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