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
  <Link href={`/bookScroll/${id}`}>
    <ThemedView style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </ThemedView>
  </Link>
)

export default function OtherScreen() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} id={item.id} />}
      keyExtractor={(item) => item.id}
    />
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
})
