import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Sentence } from "@/components/Sentence";
import { useLocalSearchParams } from "expo-router";
import { useSentenceContext } from "@/contexts/SentenceContext";
import CreateSentenceItem from "@/components/CreateSentenceItem";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

const firstString = (value: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export default function SentenceScreen() {
  const { bookId, sentenceId } = useLocalSearchParams();
  const sentenceIdString = firstString(sentenceId);
  const bookIdString = firstString(bookId);
  const { getSentence } = useSentenceContext();
  const [sentence, setSentence] = useState(getSentence(sentenceIdString));

  return (
    <SafeAreaView>
      <ThemedView>
        {sentence && <Sentence sentence={sentence} />}
        <ThemedText>Book ID: {bookIdString}</ThemedText>
        <CreateSentenceItem
          bookId={bookIdString}
          sentenceId={sentence?.id ?? null}
          fallback={setSentence}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
