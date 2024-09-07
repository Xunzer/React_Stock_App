import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, createContext } from 'react';
import 'react-native-reanimated';
import { PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '@/theme';
import { SearchableStock } from '@/data';
import { searchStock } from '@/utils/searchStock';
import AsyncStorage from '@react-native-async-storage/async-storage';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// define a React context that is used to share state across components in application without having to pass props manually at every level, the values and functions are placeholders at this step
export const StoreContext = createContext<{
  searchQuery: string, 
  setSearchQuery: (text: string) => void,
  searchedStock: SearchableStock[],
  setSearchedStock: (stocks: SearchableStock[]) => void,
  favoritedStocks: string[]
  updateFavoritedStocks: (ticker: string, op: "add" | "del") => void
}>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStock: [],
  setSearchedStock: () => {},
  favoritedStocks: [],
  updateFavoritedStocks: () => {}
});

// register the basic tabs, the search screen and ticker screen
function RootLayoutNav() {
  // initialize the states for the query and the returned stocks
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState<SearchableStock[]>([]);
  const [favoritedStocks, setFavoritedStocks] = useState<string[]>([]);

  const updateFavoritedStocks = async (ticker: string, op: "add" | "del") => {
    const prevStocks = [...favoritedStocks];
    const newStocks =
      op === "del"
        ? prevStocks.filter((symbol) => symbol !== ticker)
        : [ticker, ...prevStocks];

    try {
      await AsyncStorage.setItem("favorited", JSON.stringify(newStocks));
      setFavoritedStocks(newStocks);
    } catch (error) {
      setFavoritedStocks(prevStocks);
    }
  };

  useEffect(() => {
    async function getFavoritedStocks() {
      const stocks = await AsyncStorage.getItem("favorited");
      if (stocks) setFavoritedStocks(JSON.parse(stocks));
    }

    getFavoritedStocks();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        {/* context provider is used to provide the context values to its child components like the stack */}
        <StoreContext.Provider value={{searchQuery, setSearchQuery, searchedStock, setSearchedStock, favoritedStocks, updateFavoritedStocks}}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* define the outlook of the search screen */}
              <Stack.Screen name="search" options={{ 
                headerTitle: () => 
                <TextInput 
                style={{ width: "80%", height: 45 }} 
                mode="outlined" 
                placeholder="Search Stocks..." 
                autoFocus
                dense 
                onChangeText={(text: string) => {
                  // in real life scenarios we would usually call an API that points to some sort of database
                  setSearchQuery(text);
                  // get the possbile stocks based on the text and set up the searchedStock state array
                  const stocks = searchStock(text);
                  setSearchedStock(stocks);
                }}
                onFocus={() => {
                  // Clear the query and searchedStock array when the search bar gains taps
                  setSearchQuery("");
                  setSearchedStock([]);
                }}>

                </TextInput> }} />
              <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
            </Stack>
          </GestureHandlerRootView>
        </StoreContext.Provider>
      </ThemeProvider>
    </PaperProvider>

  );
}
