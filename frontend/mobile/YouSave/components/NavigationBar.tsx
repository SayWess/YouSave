import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.navBar, { backgroundColor: colors.greyLight }]}>

      <TouchableOpacity onPress={() => setActiveTab("Home")} style={styles.navItem}>
        <FontAwesome
          name="home"
          size={24}
          color={activeTab === "Home" ? colors.tint : colors.greyMedium}
        />
        <ThemedText variant="button" color={activeTab === "Home" ? "tint" : "greyMedium"}>
          Home
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Videos")} style={styles.navItem}>
        <FontAwesome
          name="video-camera"
          size={24}
          color={activeTab === "Videos" ? colors.tint : colors.greyMedium}
        />
        <ThemedText variant="button" color={activeTab === "Videos" ? "tint" : "greyMedium"}>
          Videos
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Playlists")} style={styles.navItem}>
        <FontAwesome
          name="list"
          size={24}
          color={activeTab === "Playlists" ? colors.tint : colors.greyMedium}
        />
        <ThemedText variant="button" color={activeTab === "Playlists" ? "tint" : "greyMedium"}>
          Playlists
        </ThemedText>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderTopColor: "#ccc",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
