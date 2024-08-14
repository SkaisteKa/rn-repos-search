import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

type IssueListItemProps = {
  state: IssueState;
  title: string;
  id: string;
  user: string;
  commentsCount: number;
};

enum IssueState {
  open = 'open',
  closed = 'closed',
}

const IssueListItem: FC<IssueListItemProps> = ({
  state,
  title,
  id,
  user,
  commentsCount,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          state === IssueState.open
            ? require('./assets/open-icon.png')
            : require('./assets/closed-icon.png')
        }
        width={18}
        height={18}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.textStyle}>{`#${id} opened by ${user}`}</Text>
      </View>
      {commentsCount > 0 && (
        <View style={styles.commentsContainer}>
          <Image
            source={require('./assets/chat-bubble.png')}
            style={styles.chatBubble}
          />
          <Text style={styles.textStyle}>{commentsCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomColor: '#E6E7E933',
    borderBottomWidth: 0.3,
  },
  titleContainer: {
    marginLeft: 8,
    marginRight: 20,
    width: '75%',
  },
  title: {
    color: '#E6E7E9',
    fontFamily: 'Rubic-Regular',
    fontSize: 16,
    fontWeight: '700',
  },
  textStyle: {
    color: '#E6E7E9',
    fontFamily: 'Rubic-Regular',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.5,
  },
  commentsContainer: {
    flexDirection: 'row',
  },
  chatBubble: {
    marginRight: 6,
  },
});

export default IssueListItem;
