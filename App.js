/**
 * 🌪 Tornado 🌪
 */

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function FeedScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // https://oauth.vk.com/authorize?client_id=YOUR_ID_HERE&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall,friends&response_type=token&v=5.122&state=hullo
    const api_token = "heheheh";
    const api_version = "5.122";
    const newsfeed_req = `https://api.vk.com/method/newsfeed.get?access_token=${api_token}&v=${api_version}`;

    console.log(newsfeed_req);
    useEffect(() => {
        fetch(newsfeed_req)
            .then((response) => response.json())
            .then((json) => setData(json.response.items))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                 data={data}
                 keyExtractor={ item => String(item.date) + '_' + item.source_id + '_' + item.post_id }
                 renderItem={({ item }) => (
                     <Text>
                         <Text style={{
                                 textAlign: "center",
                                 color: "black",
                                 fontWeight: "bold"
                               }}
                           >{String(item.date) + '_' + item.source_id + '_' + item.post_id}</Text>
                         <Text>{item.text}</Text>
                     </Text>
                 )}
                />
            )}
        </View>
    );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="🌪">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="🌪" component={FeedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
  );
};

export default App;
