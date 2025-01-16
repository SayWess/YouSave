import { StyleSheet, Text, type TextProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";

const styles = StyleSheet.create({
    body3: {
        fontSize: 12, 
        lineHeight: 16
    },
    body2: {
        fontSize: 14, 
        lineHeight: 20
    },
    body1: {
        fontSize: 16, 
        lineHeight: 20
    },
    headline: {
        fontSize: 24, 
        lineHeight: 32, 
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 8, 
        lineHeight: 12
    },
    button: {
        fontSize: 16, 
        lineHeight: 20, 
        fontWeight: 'bold'
    },
    subtitle1: {
        fontSize: 14, 
        lineHeight: 16, 
        fontWeight: 'bold'
    },
    subtitle2: {
        fontSize: 12, 
        lineHeight: 16, 
        fontWeight: 'bold'
    },
    subtitle3: {
        fontSize: 10, 
        lineHeight: 16, 
        fontWeight: 'bold'
    },
})

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"],
}

export function ThemedText ({variant, color, style, ...props}: Props) {
    const colors = useThemeColors();

    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "greyDark"]}, style]} {...props} />;
}


