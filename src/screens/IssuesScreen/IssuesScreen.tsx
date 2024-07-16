import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import BackgroundImage from '../../../assets/img/bgr.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainStackNavigator';
import IssueListItem from './components/IssueListItem';

type IssuesScreenProps = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const IssuesScreen: FC<IssuesScreenProps> = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.inputsContainer}>
          <Text>IssuesScreen</Text>
          <IssueListItem
            state='open'
            title='this is text for text title jgshg hgksdgh hgkdsgfdjh hgkdfgkhfd'
            id='423432'
            user='cat5345'
            commentsCount={2}
          />
          <IssueListItem
            state='open'
            title='this is text for text title'
            id='423432'
            user='cat5345'
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default IssuesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#040C28',
  },
  backgroundImage: { flex: 1 },
  inputsContainer: { marginTop: 80 },
});
