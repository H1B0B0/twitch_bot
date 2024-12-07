import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Switch } from 'react-native';
import { Slider } from '@rneui/themed';

interface HomeProps {
    token: string;
    username: string;
    theme: {
        backgroundColor: string;
        textColor: string;
        inputBackground: string;
        inputBorder: string;
    };
    onLogout: () => void;
}

function Home({ token, username, theme, onLogout }: HomeProps) {
    const [threads, setThreads] = useState('');
    const [channelName, setChannelName] = useState('');
    const [gameName, setGameName] = useState('');
    const [chatEnabled, setChatEnabled] = useState(false);
    const [messagesPerMinute, setMessagesPerMinute] = useState(1);
    const [proxyType, setProxyType] = useState('http');
    const [timeout, setTimeout] = useState(10000);

    const handleTimeoutChange = (value: number) => {
        setTimeout(value);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Pressable
                style={({ pressed }) => [
                    styles.logoutButton,
                    { backgroundColor: pressed ? '#D32F2F' : '#F44336' }
                ]}
                onPress={onLogout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>

            <Text style={[styles.welcome, { color: theme.textColor }]}>
                Welcome {username}!
            </Text>

            <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.textColor }]}>Number of threads:</Text>
                <TextInput
                    style={[styles.input, {
                        backgroundColor: theme.inputBackground,
                        borderColor: theme.inputBorder,
                        color: theme.textColor
                    }]}
                    value={threads}
                    onChangeText={setThreads}
                    placeholder="Enter number of threads"
                    placeholderTextColor={theme.inputBorder}
                />

                <Text style={[styles.label, { color: theme.textColor }]}>Channel name or URL:</Text>
                <TextInput
                    style={[styles.input, {
                        backgroundColor: theme.inputBackground,
                        borderColor: theme.inputBorder,
                        color: theme.textColor
                    }]}
                    value={channelName}
                    onChangeText={setChannelName}
                    placeholder="Enter channel name"
                    placeholderTextColor={theme.inputBorder}
                />
                <Text style={[styles.label, { color: theme.textColor }]}>Proxy type:</Text>
                <View style={styles.proxyContainer}>
                    {['http', 'socks4', 'socks5', 'all'].map((type) => (
                        <Pressable
                            key={type}
                            style={[
                                styles.proxyButton,
                                proxyType === type && styles.proxyButtonActive
                            ]}
                            onPress={() => setProxyType(type)}
                        >
                            <Text style={styles.proxyButtonText}>{type}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={[styles.label, { color: theme.textColor }]}>
                    Timeout: {timeout}ms
                </Text>
                <Slider
                    value={timeout}
                    onValueChange={handleTimeoutChange}
                    maximumValue={10000}
                    minimumValue={1000}
                    step={100}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: theme.textColor }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        alignSelf: 'stretch',
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    inputContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    proxyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    proxyButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#404040', // Changed from '#ddd' to a darker gray
        minWidth: 80,
        alignItems: 'center',
    },
    proxyButtonActive: {
        backgroundColor: '#007AFF', // Keep the active blue color
    },
    proxyButtonText: {
        color: 'white', // Keep white text for good contrast
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Home;