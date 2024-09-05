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

// define a React context that is used to share state across components in application without having to pass props manually at every level
export const StoreContext = createContext<{
  searchQuery: string, 
  setSearchQuery: (text: string) => void
  searchedStock: SearchableStock[]
  setSearchedStock: (stocks: SearchableStock[]) => void}
>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStock: [],
  setSearchedStock: () => {}
});

// register the basic tabs, the search screen and ticker screen
function RootLayoutNav() {
  // initialize the states for the query and the returned stocks
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState<SearchableStock[]>([]);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        {/* context provider is used to provide the context values to its child components like the stack */}
        <StoreContext.Provider value={{searchQuery, setSearchQuery, searchedStock, setSearchedStock}}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* define the outlook of the search screen */}
            <Stack.Screen name="search" options={{ 
              headerTitle: () => 
              <TextInput 
              style={{ width: "88%", height: "100%" }} 
              mode="outlined" 
              placeholder="Search Stocks..." 
              autoFocus
              dense 
              onChangeText={(text: string) => {
                setSearchQuery(text);
                // in real life scenarios we would usually call an API that points to some sort of database
              }}>

              </TextInput> }} />
            <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
          </Stack>
        </StoreContext.Provider>
      </ThemeProvider>
    </PaperProvider>

  );
}
