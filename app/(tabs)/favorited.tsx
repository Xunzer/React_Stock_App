import { StyleSheet, View, FlatList, Pressable, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { useContext } from 'react';
import { StoreContext } from '../_layout';
import { stocks } from '@/data';
import { StockCard } from '@/components/StockCard';
import { Swipeable } from 'react-native-gesture-handler';

function RightActions({
  progress,
  dragX,
  onPress,
}: {
  progress: Animated.AnimatedInterpolation<string | number>;
  dragX: Animated.AnimatedInterpolation<string | number>;
  onPress: () => void;
}) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });

  return (
    <Pressable
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
      }}
      onPress={onPress}
    >
      <Animated.Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          color: "white",
          transform: [{ scale }],
        }}
      >
        Delete
      </Animated.Text>
    </Pressable>
  );
}

// screen for the Favorited tab
export default function FavoritedScreen() {
  const { favoritedStocks, updateFavoritedStocks } = useContext(StoreContext);

  if (favoritedStocks.length > 0) return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks.filter((i) => favoritedStocks.includes(i.ticker))}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progress, dragX) => (
              <RightActions
                progress={progress}
                dragX={dragX}
                onPress={() => updateFavoritedStocks(item.ticker, "del")}
              />
            )}
          >
            <StockCard {...item} />
          </Swipeable>
        )}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ fontWeight: "bold" }}>No Favorited Stocks</Text>
    </View>
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
