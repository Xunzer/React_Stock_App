import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native-paper';

// naming the file with "[]" creates a route where "ticker" is dynamic input
export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Text>{ticker}</Text>
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
