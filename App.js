/**
 * 🌪 Tornado 🌪
 */

import React from 'react';
import {
    RefreshControl,
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';

const widthConst = Dimensions.get('screen').width;

const MessagesScreen = () => (
    <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
        <Text>Home!</Text>
    </View>
);

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function getFeedScreen() {
    const [is_refreshing, setRefreshing] = React.useState(false);
    const [feed_data, setListData] = React.useState([]);

    const onRefresh = React.useCallback(async () => {
        const api_token = 'INSERT YOURS';
        const api_version = '5.122';
        const api_method_newsfeed_get = `https://api.vk.com/method/newsfeed.get?access_token=${api_token}&v=${api_version}`;
        try {
            setRefreshing(true);
            let response = await fetch(api_method_newsfeed_get);
            let responseJson = await response.json();
            setListData(responseJson.response.items);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }, [is_refreshing]);

    const NewsfeedItemHeader = ({source_name, date}) => {
        return (
            <View
                style={styles.newsfeed_item_header}
            >
                <Image
                    style={styles.newsfeed_item_header_thumbnail}
                />
                <View
                    style={styles.newsfeed_item_header_time}
                >
                    <Text
                        style={styles.newsfeed_item_header_source_name}
                    >{source_name}</Text>
                    <Text
                        style={styles.newsfeed_item_header_time}
                    >{timeConverter(date)}</Text>
                </View>
            </View>
        );
    };

    const RenderPhotos = ({photos}) => {
        const photo = photos ? photos[0] : null;
        console.log(`photo is: ${photo}`);
        if (photo && photo.type && (photo.type == 'photo')) {
            const uri = photo.photo.sizes[photo.photo.sizes.length - 1].url;
            console.log(`PHOTO URI: ${uri}`);
            return (
                <Image
                    source={{uri: uri}}
                    style={styles.newsfeed_item_content_photo}
                />
            );
        }

        return (<Text>FUCK OFF</Text>);
    };

    const NewsfeedItemContent = ({item_data}) => {
        return (
            <View>
                <Text>{item_data.text}</Text>
                <RenderPhotos
                    photos={item_data.attachments}
                />
            </View>
        );
    };

    const NewsfeedItem = ({item_data}) => (
        <View>
            <NewsfeedItemHeader
                source_name={item_data.source_id}
                date={item_data.date}
            />
            <NewsfeedItemContent
                item_data={item_data}
            />
        </View>
    );

    return (
        <SafeAreaView
            style={{flex: 1, padding: 24}}
        >
            <FlatList
                data={feed_data}
                refreshControl={<RefreshControl refreshing={is_refreshing} onRefresh={onRefresh}/>}
                renderItem={({item}) => <NewsfeedItem item_data={item}/>}
            />
        </SafeAreaView>
    );
}

function getSettingsScreen() {
    return (
        <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

const Tornado = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="FEED"
            >
                <Tab.Screen
                    name="MSG"
                    component={MessagesScreen}
                />
                <Tab.Screen
                    name="FEED"
                    component={getFeedScreen}
                />
                <Tab.Screen
                    name="OPTS"
                    component={getSettingsScreen}
                />
                <Tab.Screen
                    name="PROFILE"
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tornado;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newsfeed_item_header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    newsfeed_item_header_thumbnail: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    newsfeed_item_header_source_name: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 18,
    },
    newsfeed_item_header_info: {
        flexDirection: 'column',
    },
    newsfeed_item_header_time: {
        fontSize: 16,
    },
    newsfeed_item_content_photo: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',
        borderColor: '#aaa',
    },
});
