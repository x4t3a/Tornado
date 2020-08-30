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
    
//    const api_token = "08de80d6e74322e9e0cbcfec3d53bf8d9b49269a4b45e8ff3b24c365f7cc7e4e1ddcb65819e601ae3f414";
//    const api_version = "5.122";
//
//    useEffect(() => {
//        fetch("https://api.vk.com/method/newsfeed.get?access_token=08de80d6e74322e9e0cbcfec3d53bf8d9b49269a4b45e8ff3b24c365f7cc7e4e1ddcb65819e601ae3f414&v=5.122")
//            .then((response) => response.json())
//            .then((json) => setData(json))
//            .catch((error) => console.error(error))
//            .finally(() => setLoading(false));
//    }, []);
  
  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
    return (
//        <View style={{ flex: 1, padding: 24 }}>
//          {isLoading ? <ActivityIndicator/> : (
//            <FlatList
//              data={data}
//              renderItem={({ item }) => (
//                <Text>{item}</Text>
//              )}
//            />
//          )}
//        </View>
<View style={{ flex: 1, padding: 24 }}>
  {isLoading ? <ActivityIndicator/> : (
    <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
        <Text>{item.title}, {item.releaseYear}</Text>
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
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
  );
};

export default App;
