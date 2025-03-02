import { SentenceItem } from "@/types/models"
import { ThemedInput } from "./ThemedInput"
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react"

export function CreateSentenceItem({
  sentenceItem,
  update,
}: {
  sentenceItem: SentenceItem
  update: (sentenceItem: SentenceItem) => void
}) {
  const [language, setLanguage] = useState(sentenceItem.language)
  const [content, setContent] = useState(sentenceItem.content)

  useEffect(() => {
    update({ language, content })
  }, [language, content])

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.label}>laguage</ThemedText>
      <ThemedInput
        style={styles.input}
        value={language}
        onChangeText={setLanguage}
        placeholder="language"
      />
      <ThemedText style={styles.label}>content</ThemedText>
      <ThemedInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="content"
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
    margin: 10,
  },
  label: {
    fontSize: 15,
  },
  input: {
    fontSize: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
  },
})
