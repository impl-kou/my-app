import { AnswerInput } from "@/components/AnswerInput"
import { ThemedView } from "@/components/ThemedView"
import { Sentence as SentenceType } from "@/types/models"
import React from "react"
import { FlatList, StyleSheet, StatusBar } from "react-native"
import { SentenceItem } from "@/components/SentenceItem"

type SentenceProps = { sentence: SentenceType; withInput?: boolean }
export const Sentence = ({ sentence, withInput }: SentenceProps) => (
  <ThemedView style={styles.sentenceGroup}>
    <FlatList
      style={styles.sentenceGroup}
      data={sentence.sentenceItems}
      renderItem={({ item }) => <SentenceItem sentenceItem={item} />}
      keyExtractor={(item) => item.language}
    />
    {withInput && <AnswerInput sentenceItem={sentence.sentenceItems[0]} />}
  </ThemedView>
)

const styles = StyleSheet.create({
  sentenceGroup: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 10,
  },
})

export default Sentence
