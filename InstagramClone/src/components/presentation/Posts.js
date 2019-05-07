import React, { Component } from 'react';
import {
    Text,
    View,  
    StyleSheet,
    FlatList,
} from 'react-native';
import Post from './Post';


class Posts extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                <FlatList
                    data={this.props.posts}
                    renderItem={({item}) => <Post post={item} />}
                    keyExtractor={(item, index) => 'key'+index}
                />
            </View>
        );
    }
}

export default Posts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});