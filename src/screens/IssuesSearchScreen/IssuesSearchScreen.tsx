import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import BackgroundImage from '../../../assets/img/bgr.png';
import PrimaryButton from '../../components/PrimaryButton';
import { useGetRepositoryMutation } from './quaries/useGetRepositoryMutation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/MainStackNavigator';

interface FormData {
  owner: string;
  repository: string;
}

type IssuesSearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'IssueSearch'
>;

const IssuesSearchScreen: FC<IssuesSearchScreenProps> = ({ navigation }) => {
  const { control, getValues, handleSubmit } = useForm<FormData>();
  const {
    mutate: mutateGetRepository,
    isPending: isGetRepositoryPending,
    isSuccess: isGetRepositorySuccess,
  } = useGetRepositoryMutation();

  const onSubmit = () => {
    mutateGetRepository(
      {
        owner: getValues('owner').toLowerCase(),
        repository: getValues('repository').toLowerCase(),
      },
      {
        onSuccess: (repoData) => {
          if (repoData.open_issues > 0) {
            navigation.replace('Issues', {
              owner: getValues('owner'),
              repository: getValues('repository'),
              issuesCount: repoData.open_issues,
            });
          } else {
            Alert.alert('There are no open issues for this repository');
          }
        },
        onError: (error) => {
          console.log('Error:', error.message);
          Alert.alert('Not Found. Check Owner and Repository and try again');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.inputsContainer}>
          <Input
            label='Owner'
            control={control}
            name='owner'
            placeholder='Owner name'
            isValid={isGetRepositorySuccess}
            required
          />
          <Input
            label='Repository'
            control={control}
            name='repository'
            placeholder='Repository name'
            isValid={isGetRepositorySuccess}
            required
          />
        </View>
        <PrimaryButton
          title='Show Issues'
          onPress={handleSubmit(onSubmit)}
          isLoading={isGetRepositoryPending}
        />
      </ImageBackground>
    </View>
  );
};

export default IssuesSearchScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#040C28',
  },
  backgroundImage: { flex: 1 },
  inputsContainer: { marginTop: 80 },
});
