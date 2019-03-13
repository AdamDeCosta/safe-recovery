import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native'

export default class ReminderScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text>Reminder Screen</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
});