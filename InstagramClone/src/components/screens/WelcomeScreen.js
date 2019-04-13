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

    render() {
        return (
            <View style={styles.container}>
                {/* Title */}
                {this.state.fontLoaded ? (
                    <Text style={styles.header}>Seeker Finder</Text>    
                ) : (
                    <ActivityIndicator size="large" />
                )}
                
                {/* SubTitle */}
                <Text style={styles.subTitle}>Sign up to manage your posts and see the comments.</Text>

                {/* Sign In */}
                <Text
                    onPress={() => this.props.navigation.navigate('SignIn')}
                    accessibilityLabel="Sign In Button"
                    style={styles.btn}
                >
                    Sign In
                </Text>    

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.divider_bar}></View>
                    <Text>OR</Text>
                    <View style={styles.divider_bar}></View>
                </View>
                
                {/* Sign Up */}
                <Text
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    accessibilityLabel="Sign Up Button"
                    style={styles.btn}
                >
                    Sign up with email or phone number
                </Text>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.divider_bar}></View>
                    <Text>OR</Text>
                    <View style={styles.divider_bar}></View>
                </View>

                {/* Guest navigator */}
                <Text
                    // onPress={() => this.props.navigation.navigate('SignUp')}
                    accessibilityLabel="Visit as guest"
                    style={styles.btn}
                >
                    Visit as guest
                </Text>       
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
        fontSize: 50,
        marginTop: 50,
    },
    subTitle: {
        fontSize: 20,
        marginTop: 25,
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
        fontSize: 20,
        width: 300,
        backgroundColor: 'powderblue',
        textAlign: 'center',
        marginTop: 25,
        // borderRadius: 10,
        padding: 5,
    }
});