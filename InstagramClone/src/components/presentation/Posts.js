import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    FlatList,
    Image, 
} from 'react-native';



class Posts extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to the Posts Component</Text>
            </View>
        );
    }
}

export default Posts;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});
