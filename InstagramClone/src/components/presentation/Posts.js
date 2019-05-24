import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    FlatList,
} from 'react-native';
import Post  from './Post';

import globalStore from '../../../GlobalStore';


class Posts extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={globalStore.posts}
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