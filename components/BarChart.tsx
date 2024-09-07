import { BarChart as BarCh} from "react-native-gifted-charts";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

// define the BarCh component, accepting props for label, data, color, and style
export const BarChart = ({
    label,
    data,
    color,
    style,
} : {
    label: string, // The label to display above the bar chart 
    data: any[], // The data array for the bar chart
    color: string, // The color for the bars in the chart
    style?: StyleProp<ViewStyle> // optional additional styles for the container
}) => {
    // calculate the maximum value from the data array for scaling the bar chart
    const maxValue = Math.max(...data.map((i) => i.value));
  
    return (
        /* if the style prop is provided, it will override styles on top of styles.container, if the style prop is not provided, React Native simply applies styles.container */
        <View style={[styles.container, style]}>
            {/* render the label above the chart */}
            <Text style={styles.text}>{label}</Text> 
            {/* render the bar chart */}
            <BarCh
                height={150}
                maxValue={maxValue * 1.5}
                barWidth={50}
                initialSpacing={0}
                noOfSections={5}
                rulesColor={"black"}
                barBorderRadius={4}
                frontColor={color}
                data={data}
                rotateLabel
                xAxisColor={"gray"}
                xAxisThickness={2}
            />
        </View>
    );
};

// define the styles for component (container and text)
const styles = StyleSheet.create({
    container: {
        height: 250,
    },
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    }
});