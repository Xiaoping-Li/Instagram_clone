import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import {
    View,  
    StyleSheet,
    FlatList,
} from 'react-native';
import Post from './Post';

// import globalStore from '../../../GlobalStore';

@inject('globalStore')
@observer
class Posts extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.globalStore.posts}
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