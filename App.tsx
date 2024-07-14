import React from 'react';
import { SafeAreaView } from 'react-native';
import IssueSearchScreen from './src/screens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <IssueSearchScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
