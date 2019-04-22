import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,  
    Image,
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import Icon from '@expo/vector-icons/MaterialIcons';

class AddPostScreen extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            camera: false,
        };
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
                        color="gray"
                    />

                    <Icon
                        style={styles.icon}
                        onPress={this.takePicture} 
                        name="camera-alt" 
                        size={80}
                        color="gray" 
                    /> 
                </View>

                <View style={styles.img}>
                    {this.state.image && 
                        <Image
                            source={{uri: this.state.image}} 
                            style={{width: 300, height: 300}}
                        />
                    }    
                </View>
                
                            
            </View>
        );
    }

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
           let data = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3], // only works on Androi, since ios is always square crop
            });
            if (!data.cancelled) this.setState({image: data.uri});
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
            if (!data.cancelled) this.setState({image: data.uri});
        } else {
            alert('Camera permission denied! Please go to Settings to give permission manually');
        } 
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
    img: {
        height: 300,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 50,
    }
});