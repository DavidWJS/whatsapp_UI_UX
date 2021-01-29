import React from 'react';
import { Text, View } from 'react-native';
import { Message } from '../../types';
import moment from 'moment';
import styles from './styles';

export type ChatMessageProps = {
    message: Message;
    myId: String,
}
const ChatMessage = (props: ChatMessageProps) => {

    const {message, myId} = props;

    const isMine = () => {
        return message.user.id === myId;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, 
                {
                    backgroundColor: isMine() ? '#DCF8C5' : '#fff',
                    marginRight: isMine() ? 0 : 50,
                    marginLeft: isMine() ? 50 : 0,
                }
                ]}>
                {!isMine() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View> 
        </View>
    )
}

export default ChatMessage;