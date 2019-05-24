import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    FlatList,
    Text,
    Image,
} from 'react-native';

import globalStore from '../../../GlobalStore';


class Comments extends Component {

    // Have to use keyword "item", could not change to other, otherwise, get undefined
    renderRow = ({item}) => {
        return (
            <View style={{width: 300}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={{uri: item.user.thumbnail}} style={{width: 15, height: 15}}/>
                    <Text>{item.user.username}</Text>
                </View>
                <Text>{item.content}</Text>
                <View style={{width: 300, height: 1, backgroundColor: '#D3D3D3',}}></View>
            </View>
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.comments}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => 'key'+index}
                />
            </View>
        );
    }
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});