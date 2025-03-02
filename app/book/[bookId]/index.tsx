import { ThemedText } from "@/components/ThemedText"
import { Link, useLocalSearchParams } from "expo-router"
import React from "react"
import {
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"

import { useBookContext } from "@/contexts/BookContext"
import { Ionicons } from "@expo/vector-icons"
import Sentence from "@/components/Sentence"

type params = {
  bookId: string
}

export default function BookScreen() {
  const { bookId } = useLocalSearchParams<params>()
  const { getBook } = useBookContext()
  const book = getBook(bookId)
  if (!book) {
    return <ThemedText>Book not found</ThemedText>
  }
  const addSentenceButton = (
    <TouchableOpacity onPress={() => {}} style={styles.button}>
      <Link href={`/book/${bookId}/createSentence`}>
        <Ionicons name="add-circle" size={24} color="green" />
      </Link>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText>informations about this book</ThemedText>
      <ThemedText>id: {bookId}</ThemedText>
      <FlatList
        data={book.sentences}
        renderItem={({ item }) => <Sentence sentence={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      {addSentenceButton}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  button: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
  },
})
