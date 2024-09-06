import { SafeAreaView, View, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { selectStock, selectStockPrices } from '@/utils/searchStock';
import { Image } from 'expo-image';

// naming the file with "[]" creates a route where "ticker" is dynamic input
export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  // inform typescript that ticker is a string
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);

  return (
    <SafeAreaView 
      style={{
        flex: 1, 
        marginHorizontal: 20, 
        marginBottom: 10
      }}
    > 
      <View 
        style={{
          flexDirection: "row", 
          paddingVertical: 25, 
          justifyContent: "space-between"
        }}
      > 
        {/* if you press on this, you would be redirected back */}
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" color={"white"} size={40} />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="heart-plus-outline" color={"white"} size={40} />
        </Pressable>
      </View>
      {stock ? <FlatList
        data={[1]}
        renderItem={() => <View>
            <View style={{ flexDirection: "row" }}>
              <Image source={stock.image} style={{ width: 50, height: 50 }} contentFit="contain" />
              <View style={{ paddingLeft: 20 }}>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>{stock.ticker}</Text>
                <Text variant="labelMedium">{stock.companyName}</Text>
              </View>

            </View>
          </View>
        }
      /> : <Text>Stock is not Available</Text>}
    </SafeAreaView>
  );
}

