import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Colors } from '@/constants/Colors';


const styles = StyleSheet.create({
    input: {
        width: "100%",
        minHeight: 50,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }
});

type Props = TextInputProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"],
}

export function ThemedTextInput({ style, ...props }: Props) {
    const colors = useThemeColors();
    return (
        <TextInput
            style={[styles.input,
                {
                    backgroundColor: colors.greyLight,
                    color: colors.greyDark,
                },
                style
            ]}
            placeholderTextColor={colors.greyMedium}
            {...props}
        />
    );
}



