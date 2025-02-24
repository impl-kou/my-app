import React, { useState } from "react"
import { ThemedView } from "@/components/ThemedView"
import { Sentence } from "@/components/Sentence"
import { useLocalSearchParams } from "expo-router"
import { useSentenceContext } from "@/contexts/SentenceContext"
import CreateSentenceItem from "@/components/CreateSentenceItem"

const firstString = (value: string | string[]) =>
  Array.isArray(value) ? value[0] : value

export default function SentenceScreen() {
  const { bookId, sentenceId } = useLocalSearchParams()
  const sentenceIdString = firstString(sentenceId)
  const bookIdString = firstString(bookId)
  const { getSentence } = useSentenceContext()
  const [sentence, setSentence] = useState(getSentence(sentenceIdString))

  return (
    <ThemedView>
      {sentence && <Sentence sentence={sentence} />}
      <CreateSentenceItem
        bookId={bookIdString}
        sentenceId={sentence?.id ?? null}
        fallback={setSentence}
      />
    </ThemedView>
  )
}
