import { StyleSheet, View } from 'react-native';

// whenever the user types in the name of the stock, there will be pop ups for the valid options, and whenever they click on the option, there will be a ticker, and we will pass the ticker to the screen and pull the data for displaying
export default function SearchScreen() {
  return (
    <View style={styles.container}>

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
