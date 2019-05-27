import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Image, 
} from 'react-native';
import axios from 'axios';
import { Permissions, ImagePicker } from 'expo';
import { Icon } from 'react-native-elements';

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

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
           let data = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
            });
            if (!data.cancelled) {
                this.setState({thumbnail: data.uri});
            }
        } else {
            alert('Album permission denied! Please go to Settings to give permission manually');
        }   
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.photo}>
                        <Text>Profile Photo:</Text>
                        <Image source={{uri: this.state.thumbnail}} style={{width: 50, height: 50, borderRadius: 10}} />
                        <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            size={20}
                            onPress={this.pickImage} 
                        />
                    </View>

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
    photo: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: 250,
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