import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';

interface FormData {
  owner: string;
  repository: string;
}

const IssueSearchScreen = () => {
  const {
    control,
    handleSubmit,
    //  formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <View style={styles.container}>
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
      <Button title='Show Issues' onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default IssueSearchScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#040C28',
  },
});
