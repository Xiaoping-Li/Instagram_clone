import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput, 
} from 'react-native';

import globalStore from '../../../GlobalStore';


class ProfileEdit extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>
                        <Text>User Name:</Text>
                        <TextInput
                            value={globalStore.user.username}
                            onChangeText={() => {}}
                            style={styles.input} 
                        />
                    </View>

                    <View>
                        <Text>Email Address:</Text>
                        <TextInput
                            value={globalStore.user.email}
                            onChangeText={() => {}}
                            style={styles.input} 
                        />
                    </View>

                    <View>
                        <Text>Profile Photo:</Text>
                        <TextInput
                            value={globalStore.user.thumbnail}
                            onChangeText={() => {}}
                            style={styles.input} 
                        />
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <Text onPress={() => globalStore.toggleVisible()} style={styles.cancel}>Cancel</Text>
                    <Text style={styles.edit}>Edit</Text>
                </View>
                
            </View>
        );
    }
}

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    form: {
        width: 360,
        height: 300,
        alignItems: 'center', 
        justifyContent: 'center',
        borderColor: '#e2e2e2',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
        padding: 10,
        width: 250,
        marginBottom: 25,
        borderRadius: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-around',
        width: 300,
    },
    cancel: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        color: 'red',
    },
    edit: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        color: 'blue',
    },
});