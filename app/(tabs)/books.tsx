import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function BookTab() {
  return (
    <ThemedView>
      <Link href={"/book"}>
        <ThemedText>Book List</ThemedText>
      </Link>
      <Link href={"/bookScroll"}>
        <ThemedText>Book Practice</ThemedText>
      </Link>
    </ThemedView>
  )
}
