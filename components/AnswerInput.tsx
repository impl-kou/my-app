import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import React, { useEffect } from "react"
import { StyleSheet, StatusBar } from "react-native"
import { ThemedInput } from "./ThemedInput"
import { SentenceItem } from "@/types/models"

export const AnswerInput = ({
  sentenceItem,
  style,
}: {
  sentenceItem: SentenceItem
  style?: any
}) => {
  const [text, onChangeText] = React.useState<string>("")
  const [isCorrect, setIsCorrect] = React.useState(true)

  useEffect(() => {
    setIsCorrect(sentenceItem.content.startsWith(text))
  }, [text])

  return (
    <ThemedView style={[styles.sentence, style]}>
      <ThemedText style={styles.language}>{sentenceItem.language}</ThemedText>
      <ThemedInput
        lightColor={isCorrect ? "blue" : "red"}
        darkColor={isCorrect ? "green" : "orange"}
        style={[
          styles.input,
          isCorrect ? styles.correctInput : styles.incorrectInput,
        ]}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type your answer here"
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  sentence: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  language: {
    fontSize: 18,
    color: "gray",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  correctInput: {
    borderColor: "green",
  },
  incorrectInput: {
    borderColor: "red",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  sentenceGroup: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
  },
})

export default AnswerInput
