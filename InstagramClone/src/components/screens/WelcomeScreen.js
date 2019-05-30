import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
} from 'react-native';
import { Font } from 'expo';

class WelcomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
        };
    }
    
    // Make sure the font loaded before using
    async componentDidMount() {
        await Font.loadAsync({
           'Pacifico-Reg': require('../../../assets/fonts/Pacifico-Regular.ttf'), 
        });

        this.setState({ fontLoaded: true });
    }

    navigateToSignin = () => {
        this.props.navigation.navigate('SignIn');
    }

    navigateToSignup = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Title */}
                {this.state.fontLoaded ? (
                    <Text style={styles.header}>Instagram Clone</Text>    
                ) : (
                    <ActivityIndicator size="large" />
                )}
                
                {/* SubTitle */}
                <Text style={styles.subTitle}>Sign up to manage your posts and see the comments.</Text>

                {/* Sign In */}
                <View style={styles.btn}>
                    <Text
                        onPress={this.navigateToSignin}
                        accessibilityLabel="Sign In Button"
                        style={styles.btnText}
                    >
                        Sign In
                    </Text>
                </View>
                    

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.divider_bar}></View>
                    <Text>OR</Text>
                    <View style={styles.divider_bar}></View>
                </View>
                
                {/* Sign Up */}
                <View style={styles.btn}>
                    <Text
                        onPress={this.navigateToSignup}
                        accessibilityLabel="Sign Up Button"
                        style={styles.btnText}
                    >
                        Sign Up
                    </Text>
                </View>
                
            </View>
        );
    }
}

export default WelcomeScreen;

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
    subTitle: {
        fontSize: 20,
        marginTop: 25,
        marginBottom: 30,
        textAlign: 'center',
    },
    divider: {
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25,
    },
    divider_bar: {
        backgroundColor: '#D3D3D3',
        width: 150,
        height: 1,
    },
    btn: {
        width: 300,
        backgroundColor: '#009FF8',
        marginTop: 25,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        width: 250,
        color: '#fff',
    }
});