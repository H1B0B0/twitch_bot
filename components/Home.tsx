// Home.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type HomeProps = {
    navigation: any;
    route: any;
};

function Home({ route }: HomeProps) {
    const { username } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome {username}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Home;