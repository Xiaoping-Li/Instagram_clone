import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';


class ProfileEdit extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ProfileEditScreen</Text>
            </View>
        );
    }
}

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});