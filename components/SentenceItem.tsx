import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SentenceItem as SentenceItemType } from "@/types/models"
import React from "react"
import { StyleSheet, StatusBar } from "react-native"

type SentenceItemProps = { sentenceItem: SentenceItemType }
export const SentenceItem = ({ sentenceItem }: SentenceItemProps) => (
  <ThemedView style={styles.sentence}>
    <ThemedText style={styles.language}>{sentenceItem.language}</ThemedText>
    <ThemedText style={styles.content}>{sentenceItem.content}</ThemedText>
  </ThemedView>
)

const styles = StyleSheet.create({
  sentence: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  language: {
    fontSize: 18,
    color: "gray",
    lineHeight: 24,
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
})

export default SentenceItem
