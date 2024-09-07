import { SafeAreaView, View, Pressable, FlatList, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { selectStock, selectStockPrices } from '@/utils/searchStock';
import { Image } from 'expo-image';
import { formatCurrencyValue } from '@/utils/formatCurrencyValue';
import { LineChart } from 'react-native-gifted-charts';
import { useContext, useState } from 'react';
import { BarChart } from '@/components/BarChart';
import { StoreContext } from './_layout';

// naming the file with "[]" creates a route where "ticker" is dynamic input
export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  // inform typescript that ticker is a string
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string); 
  const { width } = useWindowDimensions();
  const positiveOverallPriceChange = stockPrices && stockPrices[0].value < stockPrices[stockPrices.length - 1].value;
  const options = ["Description", "Historical Metrics"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { favoritedStocks, updateFavoritedStocks } = useContext(StoreContext);

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
        <Pressable onPress={() => {
          if (favoritedStocks.includes(ticker as string)) return updateFavoritedStocks(ticker as string, "del");
          return updateFavoritedStocks(ticker as string, "add");
        }}>
          <MaterialCommunityIcons name={favoritedStocks.includes(ticker as string) ? "heart" : "heart-plus-outline"} color={"white"} size={40} />
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
            <View style={{ paddingTop: 20 }}>
            <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
                {formatCurrencyValue(stock.price)}
            </Text >
            {/*  ternary operator to render it to either red or green */}
            <Text variant="labelLarge" style={{color: stock.priceChange > 0 ? "green" : stock.priceChange < 0 ? "red" : "auto"}}>{formatCurrencyValue(stock.priceChange)} {" "} {stock.priceChangePercentage.toFixed(2)}%</Text>
            </View>
            <View style={{ paddingTop: 20}}>
              {/* it is an area chart */}
              {stockPrices && (
                <LineChart
                  areaChart
                  data={stockPrices}
                  rotateLabel
                  labelsExtraHeight={20}
                  hideDataPoints
                  spacing={width / stockPrices.length - 2}
                  color={positiveOverallPriceChange ? "green" : "red"}
                  thickness={2}
                  startFillColor={positiveOverallPriceChange ? "green" : "red"}
                  endFillColor={positiveOverallPriceChange ? "green" : "red"}
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  hideYAxisText={true}
                  rulesType="solid"
                  rulesColor="black"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripHeight: 140,
                    pointerStripColor: "lightgray",
                    pointerStripWidth: 2,
                    pointerColor: "lightgray",
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 90,
                            width: 100,
                            justifyContent: "center",
                            marginTop: -30,
                            marginLeft: -40,
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              marginBottom: 6,
                              textAlign: "center",
                            }}
                          >
                            {items[0].date}
                          </Text>

                          <View
                            style={{
                              paddingHorizontal: 14,
                              paddingVertical: 6,
                              borderRadius: 16,
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {"$" + items[0].value.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
              )}
            </View>
            <FlatList 
              data={options} 
              keyExtractor={(item) => item} 
              style={{marginTop: 80}}
              horizontal 
              renderItem={({item}) => 
                <Button 
                  style={{ marginRight: 10 }} 
                  onPress={() => setSelectedOption(item)} 
                  mode={item === selectedOption ? "contained" : "outlined"}
                >
                  {item}
                </Button>
              }
            />

            {selectedOption === "Historical Metrics" ? 
              <View style={{ marginTop: 20 }}>
                <BarChart color="lightblue" data={stock.returnOnEquity} label="ROE" />
                <BarChart color="blue" data={stock.returnOnCapitalEmployed} label="ROCE" />
                <BarChart color="skyblue" data={stock.revenue} label="Revenue" />
                <BarChart color="darkgreen" data={stock.earnings} label="Earnings" />
                <BarChart color="lightgreen" data={stock.freeCashFlow} label="FCF" />
                <BarChart color="yellow" data={stock.cash} label="Cash" />
                <BarChart color="red" data={stock.debt} label="Debt" />
                <BarChart color="orange" data={stock.grossProfitMargin} label="Gross Profit Margin" />
                <BarChart color="cornsilk" data={stock.netProfitMargin} label="Net Profit Margin" />
              </View> : 
              <View style={{ marginTop: 20 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "bold" }}>CEO</Text>
                  <Text>{stock.ceo}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>Exchange</Text>
                  <Text>{stock.exchange}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>Sector</Text>
                  <Text>{stock.sector}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>Industry</Text>
                  <Text>{stock.industry}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>Location</Text>
                  <Text>{stock.city}, {stock.state}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>IPO</Text>
                  <Text>{stock.ipoDate}</Text>
                  <Text variant="titleMedium" style={{ fontWeight: "bold", marginTop: 5 }}>Description</Text>
                  <Text>{stock.description}</Text>
              </View>
            }
          </View>
        }
      /> : <Text>Stock is not Available</Text>}
    </SafeAreaView>
  );
}

