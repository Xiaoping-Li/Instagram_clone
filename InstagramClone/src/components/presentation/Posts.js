import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    FlatList,
} from 'react-native';
import Post from './Post';

//import {observer} from 'mobx-react';
import globalStore from '../../../GlobalStore';

//@observer
class Posts extends Component {
    
    render() {
        const posts = globalStore.posts.slice().reverse();

        return (
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    renderItem={({item, idx}) => <Post post={item} idx={idx} />}
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