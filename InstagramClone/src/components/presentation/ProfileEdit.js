import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput, 
} from 'react-native';
import axios from 'axios';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';


class ProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            username: globalStore.user.username,
            email: globalStore.user.email,
            thumbnail: globalStore.user.thumbnail,
        };
    }

    handleEdit = (e) => {
        e.preventDefault();

        const id = globalStore.user.userID;

        const update = {
            username: this.state.username,
            email: this.state.email,
            thumbnail: this.state.thumbnail,
            userID: id,
        }

        axios
            .put(`http://192.168.0.107:5000/users/?id=${id}`, update)
            .then(action(result => {
                if (result.data.success) {
                    globalStore.updateUser(update);
                    globalStore.toggleVisible();
                }
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>
                        <Text>User Name:</Text>
                        <TextInput
                            value={this.state.username}
                            onChangeText={username => this.setState({username})}
                            style={styles.input} 
                        />
                    </View>

                    <View>
                        <Text>Email Address:</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                            style={styles.input} 
                        />
                    </View>

                    <View>
                        <Text>Profile Photo:</Text>
                        <TextInput
                            value={this.state.thumbnail}
                            onChangeText={thumbnail => this.setState({thumbnail})}
                            style={styles.input} 
                        />
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <Text onPress={() => globalStore.toggleVisible()} style={styles.cancel}>Cancel</Text>
                    <Text onPress={this.handleEdit} style={styles.edit}>Edit</Text>
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