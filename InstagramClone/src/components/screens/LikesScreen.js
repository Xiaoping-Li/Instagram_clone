import React, { Component } from 'react';
import { 
    View,  
    StyleSheet,
    FlatList, 
} from 'react-native';

import { Like } from '../presentation';

import globalStore from '../../../GlobalStore';

class LikesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={globalStore.likes}
                    renderItem={({item}) => <Like like={item} />}
                    keyExtractor={(item, index) => 'key'+index}
                />
            </View>
        );
    }
}

export default LikesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});