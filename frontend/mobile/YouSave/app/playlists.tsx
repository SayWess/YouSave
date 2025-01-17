import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";


export default function Playlists() {
    return (
        <View style={styles.tabContent}>
            <ThemedText variant="headline" color="greyDark">Playlists Page</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});