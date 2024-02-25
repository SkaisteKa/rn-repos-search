import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import BackgroundImage from '../../../assets/img/bgr.png';
import PrimaryButton from '../../components/PrimaryButton';

interface FormData {
  owner: string;
  repository: string;
}

const IssueSearchScreen = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

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
            required
          />
          <Input
            label='Repository'
            control={control}
            name='repository'
            placeholder='Repository name'
            required
          />
        </View>
        <PrimaryButton title='Show Issues' onPress={handleSubmit(onSubmit)} />
      </ImageBackground>
    </View>
  );
};

export default IssueSearchScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#040C28',
  },
  backgroundImage: { flex: 1 },
  inputsContainer: { marginTop: 80 },
});
