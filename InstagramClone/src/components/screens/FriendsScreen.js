import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';

import { ListItem } from 'react-native-elements';
import globalStore from '../../../GlobalStore';


class FriendsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {globalStore.friends.length ?
                    <View>
                        {
                            globalStore.friends.map((item, idx) => (
                                <ListItem
                                    key={idx}
                                    leftAvatar={{ source: { uri: item.thumbnail }}} 
                                    title={item.friendName}
                                    chevronColor="#a9a9a9"
                                    bottomDivider={true}  
                                />
                            ))
                        }
                    </View>
                    : 
                    <View style={styles.textContainer}><Text style={styles.text}>Add some Friends</Text></View>
                }
                
            </View>
        );
    }
}

export default FriendsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', 
      //justifyContent: 'flex-start',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});