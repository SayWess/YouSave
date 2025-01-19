import { ThemedText } from "@/components/ThemedText";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Home from "@/app/home";
import VideosPage from "@/app/videos";
import Playlists from "@/app/playlists";

import { Provider } from "react-redux";
import store from "@/store/store";


export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export function Index() {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState("Home");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <Home url={url} setUrl={setUrl} loading={loading} setLoading={setLoading}  />
        );
      case "Videos":
        return (
          <VideosPage />
        );
      case "Playlists":
        return (
          <Playlists />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider style={[styles.container, { backgroundColor: colors.greyBackground }]}>

      <View style={styles.header}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
        />
        <ThemedText variant="headline" color="white">YouSave</ThemedText>
      </View>

      {renderContent()}

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
    backgroundColor: "#1E90FF",
  },
  logo: {
    width: 50,
    height: 24,
    resizeMode: "contain",
  },
});
