import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssueSearchScreen from '../screens/IssueSearchScreen';

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
    </Stack.Navigator>
  );
}
