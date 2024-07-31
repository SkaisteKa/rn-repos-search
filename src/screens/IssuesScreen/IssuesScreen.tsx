import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';
import BackgroundImage from '../../../assets/img/bgr.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainStackNavigator';
import IssueListItem from './components/IssueListItem';
import { useGetIssuesInfiniteQuery } from './queries/useGetIssuesInfiniteQuery';

type IssuesScreenProps = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const IssuesScreen: FC<IssuesScreenProps> = (props) => {
  const { owner, repository } = props.route.params;
  const {
    data: issuesData,
    fetchNextPage,
    hasNextPage,
  } = useGetIssuesInfiniteQuery(owner, repository);
  console.log('pages data', issuesData?.pages.length);
  console.log('hasNextPage', hasNextPage);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.inputsContainer}>
          <Text onPress={() => fetchNextPage()}>IssuesScreen</Text>
          <FlatList
            data={issuesData?.pages.flat()}
            renderItem={({ item }) => {
              return (
                <IssueListItem
                  state={item.state}
                  title={item.title}
                  id={item.id}
                  user={item.user.login}
                  commentsCount={item.comments}
                />
              );
            }}
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
