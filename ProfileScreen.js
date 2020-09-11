import {
    Button,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import React, { useState } from 'react';
import VKLogin from 'react-native-vkontakte-login';

function ProfileScreen() {
    const [accessToken, setAccessToken] = useState();

    async function vkAuth() {
        const auth = await VKLogin.login(['friends', 'photos', 'wall'])
        console.log(auth.access_token)
        setAccessToken(auth.access_token)
    }

    function VkButton() {
        const title = 'Vk auth';
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{accessToken}</Text>
                <Button title={title} onPress={vkAuth}/>
            </View>
        );
    }


    return (
        <VkButton/>
    );
}

export default ProfileScreen
