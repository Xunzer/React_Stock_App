import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 , paddingTop: 30}}>
        <Text 
        style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}
        variant="titleLarge">
          Current Stocks
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
