import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    FlatList,
    Text,
    Image,
} from 'react-native';


class Comments extends Component {

    // Have to use keyword "item", could not change to other, otherwise, get undefined
    renderRow = ({item}) => {
        return (
            <View style={{width: 350}}>
                <View style={{width: 350, height: 1, backgroundColor: '#D3D3D3', marginBottom: 5, marginTop: 5}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 5}}>
                    <Image source={{uri: item.user.thumbnail}} style={{width: 20, height: 20, borderRadius: 10, marginRight: 20,}}/>
                    <Text>{item.user.username}</Text>
                </View>
                <Text>{item.content}</Text>
                
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
        justifyContent: 'center',
        alignItems: 'center'
    },
});