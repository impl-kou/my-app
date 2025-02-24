import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Link } from "expo-router"
import React from "react"
import { FlatList, StyleSheet, StatusBar } from "react-native"

const DATA = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
  {
    id: "3",
    title: "Book 3",
  },
]

type ItemProps = { title: string; id: string }

const Item = ({ title, id }: ItemProps) => (
  <Link href={`/bookScroll/${id}`} style={styles.itemContainer}>
    {/* <ThemedView style={styles.itemContainer}> */}
    <ThemedText style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
      {title}
    </ThemedText>
    {/* </ThemedView> */}
  </Link>
)

export default function BookScrollScreen() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} id={item.id} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    color: "#333",
    flexShrink: 1,
  },
})
