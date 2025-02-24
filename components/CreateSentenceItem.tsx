import React, { Dispatch, SetStateAction, useState } from "react"
import { Button, StyleSheet } from "react-native"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedInput } from "@/components/ThemedInput"
import { useSentenceContext } from "@/contexts/SentenceContext"
import { SentenceItem, Sentence } from "@/types/models"

type CreateSentenceItemProps = {
  bookId: string
  sentenceId: string | null
  fallback?: Dispatch<SetStateAction<Sentence | undefined>>
}
export default function CreateSentenceItem({
  bookId,
  sentenceId,
  fallback,
}: CreateSentenceItemProps) {
  const { addSentenceItem } = useSentenceContext()
  const [language, setLanguage] = useState("")
  const [content, setContent] = useState("")

  const handleAddSentence = () => {
    const newSentenceItem: SentenceItem = {
      language,
      content,
    }
    fallback && fallback(addSentenceItem(bookId, sentenceId, newSentenceItem))
    setLanguage("")
    setContent("")
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Language</ThemedText>
      <ThemedInput
        style={styles.input}
        value={language}
        onChangeText={setLanguage}
        placeholder="Enter language"
      />
      <ThemedText style={styles.label}>Content</ThemedText>
      <ThemedInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
      />
      <Button title="Add Sentence" onPress={handleAddSentence} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
})
