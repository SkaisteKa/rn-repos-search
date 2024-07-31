import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import BackgroundImage from '../../../assets/img/bgr.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainStackNavigator';
import IssueListItem from './components/IssueListItem';
import { useGetIssuesInfiniteQuery } from './queries/useGetIssuesInfiniteQuery';

type IssuesScreenProps = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const IssuesScreen: FC<IssuesScreenProps> = (props) => {
  const { owner, repository, issuesCount } = props.route.params;
  const [isOpenState, setIsOpenState] = useState(true);
  const {
    data: issuesData,
    fetchNextPage,
    hasNextPage,
  } = useGetIssuesInfiniteQuery(
    owner,
    repository,
    isOpenState ? 'open' : 'closed',
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.issuesContainer}>
          <View style={styles.issuesCountContainer}>
            <Text style={styles.label}>Issues</Text>
            <View style={styles.issuesCountWrapper}>
              <Text style={styles.issuesCountText}>{issuesCount}</Text>
            </View>
          </View>
          <View style={styles.statesContainer}>
            <TouchableOpacity
              style={styles.stateButton}
              onPress={() => setIsOpenState(true)}
            >
              <Image
                source={require('./assets/open-pure-icon.png')}
                style={!isOpenState && styles.inactiveState}
              />
              <Text
                style={[styles.stateName, !isOpenState && styles.inactiveState]}
              >
                Open
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stateButton}
              onPress={() => setIsOpenState(false)}
            >
              <Image
                source={require('./assets/closed-pure-icon.png')}
                style={isOpenState && styles.inactiveState}
              />
              <Text
                style={[styles.stateName, isOpenState && styles.inactiveState]}
              >
                Closed
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={issuesData?.pages.flat()}
            keyExtractor={(item) => item.id}
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
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
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
  issuesContainer: { marginTop: 80 },
  issuesCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  label: {
    color: '#E6E7E9',
    fontFamily: 'Rubic-Regular',
    fontSize: 24,
    fontWeight: '500',
  },
  issuesCountWrapper: {
    backgroundColor: '#FFFFFF1A',
    borderRadius: 20,
    marginLeft: 10,
  },
  issuesCountText: {
    color: '#E6E7E980',
    fontFamily: 'Rubic-Regular',
    fontSize: 14,
    fontWeight: '700',
    margin: 5,
  },
  statesContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF1A',
    borderBottomColor: '#E6E7E933',
    borderBottomWidth: 0.3,
    marginTop: 24,
  },
  stateButton: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 14,
  },
  stateName: {
    color: '#E6E7E9',
    fontFamily: 'Rubic-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  inactiveState: {
    opacity: 0.3,
  },
});
