import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,  
} from 'react-native';
import axios from 'axios';
import { Permissions, ImagePicker } from 'expo';
import Icon from '@expo/vector-icons/MaterialIcons';


import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

class AddPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            camera: false,
        };
    }

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
           let data = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3], // only works on Androi, since ios is always square crop
            });
            if (!data.cancelled) {
                this.setState({image: data.uri});
                this.handleSubmitPost();
            }
        } else {
            alert('Album permission denied! Please go to Settings to give permission manually');
        }   
    }

    takePicture = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            let data = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
            });
            if (!data.cancelled) {
                this.setState({image: data.uri});
                this.handleSubmitPost();
            }
        } else {
            alert('Camera permission denied! Please go to Settings to give permission manually');
        } 
    }

    handleSubmitPost() {
        const postInfo = {
            owner: globalStore.user.userID,
            uri: this.state.image,
        };

        axios
            .post('http://192.168.0.107:5000/posts', postInfo)
            .then(action(result => {
                if (result.data.success) {
                    const owner = {
                        username: globalStore.user.username,
                        thumbnail: globalStore.user.thumbnail,
                        _id: globalStore.user.userID,
                    };
                    const post = result.data.post;
                    post.owner = owner;
                    globalStore.addPosts(post);
                    this.props.navigation.navigate('Home'); 
                }   
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icons}>
                    <Icon
                        style={styles.icon}
                        onPress={this.pickImage} 
                        name="photo-album" 
                        size={80} 
                        color="#009FF8"
                    />

                    <Icon
                        style={styles.icon}
                        onPress={this.takePicture} 
                        name="camera-alt" 
                        size={80}
                        color="#009FF8" 
                    /> 
                </View>                
            </View>
        );
    }    
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'space-around',
        marginTop: 50,
    },
    icon: {
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 20,
    },
});