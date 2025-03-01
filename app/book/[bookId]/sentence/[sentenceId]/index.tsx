import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Sentence } from "@/components/Sentence";
import { useLocalSearchParams } from "expo-router";
import { useSentenceContext } from "@/contexts/SentenceContext";
import CreateSentenceItem from "@/components/CreateSentenceItem";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, StyleSheet } from "react-native-safe-area-context";

const firstString = (value: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export default function SentenceScreen() {
  const { bookId, sentenceId } = useLocalSearchParams();
  const sentenceIdString = firstString(sentenceId);
  const bookIdString = firstString(bookId);
  const { getSentence } = useSentenceContext();
  const [sentence, setSentence] = useState(getSentence(sentenceIdString));

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        {sentence && <Sentence sentence={sentence} />}
        <ThemedText style={styles.bookIdText}>Book ID: {bookIdString}</ThemedText>
        <CreateSentenceItem
          bookId={bookIdString}
          sentenceId={sentence?.id ?? null}
          fallback={setSentence}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookIdText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 16,
  },
});
