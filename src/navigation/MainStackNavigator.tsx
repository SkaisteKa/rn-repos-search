import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IssueSearchScreen, IssuesScreen } from '../screens';

export type RootStackParamList = {
  IssueSearch: undefined;
  Issues: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='IssueSearch'
    >
      <Stack.Screen name='IssueSearch' component={IssueSearchScreen} />
      <Stack.Screen name='Issues' component={IssuesScreen} />
    </Stack.Navigator>
  );
}
