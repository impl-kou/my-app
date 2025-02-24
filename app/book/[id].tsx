import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Link, useLocalSearchParams } from "expo-router"
import React from "react"
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AnswerInput } from "../../components/AnswerInput"
import { useBookContext } from "@/contexts/BookContexts"


const DATA = [
  {
    id: "1",
    sentences: [
      {
        language: "en",
        content: "The quick brown fox jumps over the lazy dog.",
      },
      {
        language: "fr",
        content: "Le renard brun rapide saute par-dessus le chien paresseux.",
      },
      {
        language: "zh",
        content: "快速的棕色狐狸跳过懒狗。",
      },
      {
        language: "jp",
        content: "速い茶色のキツネが怠惰な犬を飛び越えます。",
      },
    ],
  },
  {
    id: "2",
    sentences: [
      {
        language: "en",
        content: "this is another sentence",
      },
      {
        language: "fr",
        content: "c'est une autre phrase",
      },
      {
        language: "zh",
        content: "这是另一句话",
      },
      {
        language: "jp",
        content: "これは別の文です",
      },
    ],
  },
]

export type SentenceType = { language: string; content: string }
type SentenceProps = { sentence: SentenceType }

const Sentence = ({ sentence }: SentenceProps) => (
  <ThemedView style={styles.sentence}>
    <ThemedText style={styles.language}>{sentence.language}</ThemedText>
    <ThemedText style={styles.content}>{sentence.content}</ThemedText>
  </ThemedView>
)

const SentenceGroup = ({ sentences }: { sentences: SentenceType[] }) => (
  <View>
    <FlatList
      style={styles.sentenceGroup}
      data={sentences}
      renderItem={({ item }) => <Sentence sentence={item} />}
      keyExtractor={(item) => item.language}
    />
    <AnswerInput sentence={sentences[0]} />
  </View>
)

export default function BookScreen() {
  const { id } = useLocalSearchParams()
    const { books } = useBookContext()
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <SentenceGroup sentences={item.sentences} />}
      keyExtractor={(item) => item.id}
    />
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
