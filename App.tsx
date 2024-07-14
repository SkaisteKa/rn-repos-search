import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeAreaStyles}>
        <StatusBar barStyle='light-content' />
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    backgroundColor: '#040C28',
  },
});
