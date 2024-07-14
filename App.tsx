import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import IssueSearchScreen from './src/screens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeAreaStyles}>
        <StatusBar barStyle='light-content' />
        <IssueSearchScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaStyles: { backgroundColor: '#040C28' },
});
