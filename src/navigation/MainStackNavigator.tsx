import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IssuesSearchScreen, IssuesScreen } from '../screens';

export type RootStackParamList = {
  IssueSearch: undefined;
  Issues: { owner: string; repository: string; issuesCount: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='IssueSearch'
    >
      <Stack.Screen name='IssueSearch' component={IssuesSearchScreen} />
      <Stack.Screen name='Issues' component={IssuesScreen} />
    </Stack.Navigator>
  );
}
