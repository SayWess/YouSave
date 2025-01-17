import { TextInput, Image, StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";


interface HomeProps {
    url: string, 
    setUrl: (url: string) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void
}

export default function Home({ url, setUrl, loading, setLoading }: HomeProps) {

    const colors = useThemeColors();

    const handleSubmit = () => {
        if (!url.trim()) return;
        setLoading(true);
    
        // Simulate a delay for submission (replace with actual logic)
        setTimeout(() => {
          setLoading(false);
          console.log("Submitted URL:", url);
        }, 2000);
      };

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
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <ThemedText variant="button" color="white">Submit</ThemedText>
              )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
});