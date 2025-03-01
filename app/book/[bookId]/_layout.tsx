import React from "react"
import { Stack } from "expo-router"

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="sentence" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
