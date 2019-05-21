import React, { Component } from 'react';
import { View,  FlatList, StyleSheet, Text } from 'react-native';

import { Request } from '../presentation';

import {observer} from 'mobx-react/native';
import globalStore from '../../../GlobalStore';


@observer
class RequestsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {globalStore.requests.length ? 
                    <FlatList
                        data={globalStore.requests}
                        renderItem={({item}) => <Request req={item} />}
                        keyExtractor={(item, index) => 'key'+index}
                    />
                    :
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>No pending request</Text>
                    </View>
                }    
            </View>
        );
    }
}

export default RequestsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
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