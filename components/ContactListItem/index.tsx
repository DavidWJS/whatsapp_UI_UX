import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';
import ChatRoomScreen from '../../screens/ChatRoomScreen';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const navigation = useNavigation();

    const {user} = props;

    const onClick = async () => {
        try {
            //create new chat room
            const newChatRoomData = await API.graphql(graphqlOperation(
                createChatRoom, {
                    input: {
                        lastMessageID: ""
                    }
                }
            )
        )
        
        if(!newChatRoomData.data) {
            console.log(" Failed to create a chat room");
            return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;

        // add 'user' to the chat room
        const newUserChatRoom = await API.graphql(graphqlOperation(
            createChatRoomUser, {
                input: {
                    userID: user.id,
                    chatRoomID: newChatRoom.id
                }
            }
        ))

        //add authenticated user to the chat room
        const userInfo = await Auth.currentAuthenticatedUser();
        await API.graphql(graphqlOperation(
            createChatRoomUser, {
                input: {
                    userID: userInfo.attributes.sub,
                    chatRoomID: newChatRoom.id
                }
            }
        ))

        navigation.navigate('ChatRoom', {
            id: newChatRoom.id,
            name: user.name,
        })

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar}/>

                    <View style={styles.midContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default  ContactListItem;