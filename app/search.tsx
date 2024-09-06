import { FlatList, StyleSheet, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { StoreContext } from './_layout';
import { StockCard } from '@/components/StockCard';

// whenever the user types in the name of the stock, there will be pop ups for the valid options, and whenever they click on the option, there will be a ticker, and we will pass the ticker to the screen and pull the data for displaying
export default function SearchScreen() {
  // use React Context from layout to manage and access shared state (searchQuery and searchedStock) within the SearchScreen component 
  const { searchQuery, searchedStock } = useContext(StoreContext);


  // if there is no query and also the length of searchedStock is 0, we display Search Stocks as no action has been taken yet
  if (!searchQuery && searchedStock.length === 0) {  
    return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Search Stocks</Text>
    </View>
    );
  }
  // if there is a query but nothing inside the array, that means nothing has matched, we display No Stocks Matched...
  if (searchQuery && searchedStock.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>No Stocks Matched...</Text>
      </View>
    );
  }

    // if there is a query and there is something inside the array, return a FlatList where each item is a StockCard with its corresponding information filled in (... is spread operator that spreads the info of object)
    return (
      <FlatList
        data={searchedStock}
        keyExtractor={(item) => item.ticker}
        renderItem={({item}) => <StockCard {...item} />}
      />
    )
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
