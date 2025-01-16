import { ThemedText } from "@/components/ThemedText";
import { TextInput, Image, StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";

export default function Index() {
  const colors = useThemeColors();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const handleSubmit = () => {
    if (!url.trim()) return;
    setLoading(true);

    // Simulate a delay for submission (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      console.log("Submitted URL:", url);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.greyLight,
                  color: colors.greyDark,
                },
              ]}
              placeholder="Enter video or playlist URL"
              placeholderTextColor={colors.greyMedium}
              value={url}
              onChangeText={(text) => setUrl(text)}
              autoCapitalize="none"
              keyboardType="url"
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: loading ? colors.greyMedium : colors.tint },
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.greyWhite} />
              ) : (
                <ThemedText variant="button" color="greyWhite">Submit</ThemedText>
              )}
            </TouchableOpacity>
          </View>
        );
      case "Videos":
        return (
          <View style={styles.tabContent}>
            <ThemedText variant="headline" color="greyDark">Videos Page</ThemedText>
          </View>
        );
      case "Playlists":
        return (
          <View style={styles.tabContent}>
            <ThemedText variant="headline" color="greyDark">Playlists Page</ThemedText>
          </View>
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
        <ThemedText variant="headline" color="greyWhite">YouSave</ThemedText>
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
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
