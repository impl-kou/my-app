import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useBookContext } from "@/contexts/BookContext"
import { Link } from "expo-router"
import React from "react"
import { FlatList, StyleSheet, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type ItemProps = { title: string; id: string; removeBook: (id: string) => void }

function Item({ title, id, removeBook }: ItemProps) {
  const handleRemove = () => {
    removeBook(id)
  }

  return (
    <ThemedView style={styles.item}>
      <Link href={`/book/${id}`}>{title}</Link>
      <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
        <Ionicons name="trash" size={24} color="black" />
      </TouchableOpacity>
    </ThemedView>
  )
}

export default function BookList() {
  const { books, removeBook } = useBookContext()
  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <Item title={item.title} id={item.id} removeBook={removeBook} />
          )}
          keyExtractor={(item) => item.id?.toString() ?? "1"}
        />
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
          <Link href="/book/create">
            <Ionicons name="add-circle" size={24} color="black" />
          </Link>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  removeButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
