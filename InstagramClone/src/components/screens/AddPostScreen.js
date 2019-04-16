import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, CameraRoll, Image } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

class AddPostScreen extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
        };
    }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             console.log(err);
          });
        };

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    style={styles.icon}
                    onPress={this._handleButtonPress} 
                    name="photo-album" 
                    size={80} 
                    color="gray"
                />

                <Icon
                    style={styles.icon}
                    onPress={() => this.props.navigation.navigate('Camera')} 
                    name="camera-alt" 
                    size={80}
                    color="gray" 
                /> 

                <ScrollView>
                    {this.state.photos.map((p, i) => {
                    return (
                        <Image
                        key={i}
                        style={{
                            width: 300,
                            height: 300,
                        }}
                        source={{ uri: p.node.image.uri }}
                        />
                    );
                    })}
                </ScrollView>                 
            </View>
        );
    }
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    icon: {
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 20,
    },
});