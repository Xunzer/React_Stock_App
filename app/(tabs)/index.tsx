import { StyleSheet, View, Pressable, FlatList, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { stocks } from '@/data';
import { StockCard } from '@/components/StockCard';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  return (
    // setting up the style of main title and the list of stocks in the home screen
    <View style={{ flex: 1 , paddingTop: 30}}>
        {/* style setting for main title */}
        <Text
        style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}
        variant="titleLarge">
          Current Stocks
        </Text>
        {/* keyExtractor pulls the ticker attribute from the each stock in the list to make it primary key for rendering, data is imported from data.tsx and renderItem renders each stock in the list to a pressable that could send user to the specific ticker screen */}
        <FlatList keyExtractor={(item) => item.ticker}
          data={stocks}
          renderItem={({ item }) => (
            <StockCard
              companyName={item.companyName}
              image={item.image}
              price={item.price}
              priceChange={item.priceChange}
              priceChangePercentage={item.priceChangePercentage}
              ticker={item.ticker}
            />
          )}
        />
    </View>
  );
}
