import React from "react"
import { Stack } from "expo-router"

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ headerShown: true }} />
      <Stack.Screen name="BookIndex" options={{ headerShown: false }} />
    </Stack>
  )
}
