import React, { Component } from 'react';
import { 
    View,  
    StyleSheet,
    FlatList,
    Text, 
} from 'react-native';

import { Like } from '../presentation';

import globalStore from '../../../GlobalStore';
import {observer} from 'mobx-react/native';

@observer
class LikesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {globalStore.likes.length ?
                    <FlatList
                        data={globalStore.likes}
                        renderItem={({item}) => <Like post={item} />}
                        keyExtractor={(item) => item._id}
                    />
                    :
                    <View style={styles.textContainer}><Text style={styles.text}>Add some posts you like</Text></View>
                }   
            </View>
        );
    }
}

export default LikesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#808080',
    }
});