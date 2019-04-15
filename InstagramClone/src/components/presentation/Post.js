import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
} from 'react-native';

import Icon from '@expo/vector-icons/Feather';

class Post extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={{width: 50, height: 50}} source={{uri: this.props.post.thumbnail}} />
                    <Text>{this.props.post.user}</Text>
                </View>
                <Image style={{width: 250, height: 250}} source={{uri: this.props.post.uri}} />
                <View>
                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="heart" 
                        size={30} 
                    />

                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="message-circle" 
                        size={30} 
                    />

                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="upload" 
                        size={30} 
                    />
                </View>
            </View>
        );
    }
}

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
    },
});