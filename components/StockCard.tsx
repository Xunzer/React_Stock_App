import { formatCurrencyValue } from "@/utils/formatCurrencyValue";
import { router } from "expo-router";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";

export const StockCard = ({
    ticker,
    image,
    companyName,
    price,
    priceChange,
    priceChangePercentage,
} : {
    ticker: string,
    image: string,
    companyName: string,
    price: number,
    priceChange: number,
    priceChangePercentage: number
}) => {
    const { width } = useWindowDimensions();
    return (
        // make sure the pressable is displayed horizontally, margin between each pressable is 10, padding to the left and right of each pressable is 10 and height is 60
        <Pressable
        style={{
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 60
        }}
        onPress={() => router.push(`/${ticker}`)}>
        <Image
        source={image}
        style={{height: 50, width: 50}}
        contentFit="contain"
        />
        {/* for each item in view, we want them to be displayed horizontally, the items should have equal distance between them */}
        <View style={{ 
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 75,
        paddingLeft: 15, 
        }}>
            <View>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>{ticker}</Text>
            <Text variant="labelMedium">{companyName}</Text>
            </View>
            <View style={{
            alignItems: "flex-end"
            }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                {formatCurrencyValue(price)}
            </Text >
            {/*  ternary operator to render it to either red or green */}
            <Text variant="labelMedium" style={{color: priceChange > 0 ? "green" : priceChange < 0 ? "red" : "auto"}}>{formatCurrencyValue(priceChange)} {" "} {priceChangePercentage.toFixed(2)}%</Text>
            </View>
        </View>

        </Pressable>
    )
};