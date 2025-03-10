import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { useBookContext } from "@/contexts/BookContext";
import { Book } from "@/types/models";
import { router } from "expo-router";

export default function CreateBookScreen() {
  const { addBook } = useBookContext();
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const handleAddBook = () => {
    const newBook: Book = {
      id,
      title,
      sentences: [],
    };
    addBook(newBook);
    setTitle("");
    setId("");
    router.push("/book");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Book Title</ThemedText>
      <ThemedInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter book title"
      />
      <Button title="Add Book" onPress={handleAddBook} />
    </ThemedView>
  );
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
});
