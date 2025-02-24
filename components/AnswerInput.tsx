import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import React, { useEffect } from "react"
import { StyleSheet, StatusBar } from "react-native"
import { ThemedInput } from "./ThemedInput"
import { Sentence } from "@/types/models"

export const AnswerInput = ({ sentence }: { sentence: Sentence }) => {
  const [text, onChangeText] = React.useState<string>("")
  const [isCorrect, setIsCorrect] = React.useState(true)
  useEffect(() => {
    setIsCorrect(sentence.content.startsWith(text))
  }, [text])
  return (
    <ThemedView style={styles.sentence}>
      <ThemedText style={styles.language}>{sentence.language}</ThemedText>
      <ThemedInput
        lightColor={isCorrect ? "blue" : "red"}
        darkColor={isCorrect ? "green" : "orange"}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type your answer here"
      />
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  input: {
    fontSize: 32,
    width: "100%",
  },
  correctInput: {
    color: "green",
    fontSize: 32,
    width: "100%",
  },
  incorrectInput: {
    color: "red",
    fontSize: 32,
    width: "100%",
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
  sentence: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  language: {
    fontSize: 32,
    color: "gray",
    width: 50,
  },
  content: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
  },
})
