import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ headerShown: true }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
