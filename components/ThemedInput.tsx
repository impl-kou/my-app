import { TextInput, type TextInputProps, StyleSheet } from "react-native"
import { useThemeColor } from "@/hooks/useThemeColor"

export type ThemedInputProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link"
}

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  return (
    <TextInput
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    padding: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    padding: 10,
  },
})
