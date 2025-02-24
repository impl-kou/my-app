import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Sentence, SentenceItem } from "@/types/models"

type SentenceContextType = {
  sentences: Sentence[]
  addSentence: (bookId: string, sentence: Sentence) => Sentence
  updateSentence: (sentence: Sentence) => void
  removeSentence: (id: string) => void
  getSentence: (id: string) => Sentence | undefined
  getSentencesByBookId: (bookId: string) => Sentence[]
  addSentenceItem: (
    bookId: string | null,
    sentenceId: string | null,
    sentenceItem: SentenceItem
  ) => Sentence
}

const SentenceContext = createContext<SentenceContextType | undefined>(
  undefined
)

export const SentenceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sentences, setSentences] = useState<Sentence[]>([])

  useEffect(() => {
    const loadSentences = async () => {
      const storedSentences = await AsyncStorage.getItem("sentences")
      if (storedSentences) {
        setSentences(JSON.parse(storedSentences))
      }
    }
    loadSentences()
  }, [])

  const saveSentences = async (sentences: Sentence[]) => {
    await AsyncStorage.setItem("sentences", JSON.stringify(sentences))
  }

  const addSentence = (bookId: string, sentence: Sentence) => {
    const id = sentences.length > 0 ? sentences[sentences.length - 1].id + 1 : 1
    const newSentence = { ...sentence, id, bookId } as Sentence
    console.log("add sentence", newSentence)
    const updatedSentences = [...sentences, newSentence]
    setSentences(updatedSentences)
    saveSentences(updatedSentences)
    return newSentence
  }

  const updateSentence = (updatedSentence: Sentence) => {
    const updatedSentences = sentences.map((sentence) =>
      sentence.id === updatedSentence.id ? updatedSentence : sentence
    )
    setSentences(updatedSentences)
    saveSentences(updatedSentences)
  }

  const removeSentence = (id: string) => {
    const updatedSentences = sentences.filter((sentence) => sentence.id !== id)
    setSentences(updatedSentences)
    saveSentences(updatedSentences)
  }

  const getSentence = (id: string) => {
    return sentences.find((sentence) => sentence.id === id)
  }

  const getSentencesByBookId = (bookId: string) => {
    return sentences.filter((sentence) => sentence.bookId === bookId)
  }

  const addSentenceItem = (
    bookId: string | null,
    sentenceId: string | null,
    sentenceItem: SentenceItem
  ) => {
    var sentence = sentences.find((sentence) => sentence.id === sentenceId)
    if (!sentence) {
      return addSentence(bookId ?? "", {
        id: "",
        bookId: bookId ?? "",
        sentenceItems: [sentenceItem],
      })
    } else {
      const updatedSentence = {
        ...sentence,
        sentenceItems: [...sentence.sentenceItems, sentenceItem],
      }
      updateSentence(updatedSentence)
      return updatedSentence
    }
  }

  return (
    <SentenceContext.Provider
      value={{
        sentences,
        addSentence,
        updateSentence,
        removeSentence,
        getSentence,
        getSentencesByBookId,
        addSentenceItem,
      }}
    >
      {children}
    </SentenceContext.Provider>
  )
}

export const useSentenceContext = () => {
  const context = useContext(SentenceContext)
  if (!context) {
    throw new Error("useSentenceContext must be used within a SentenceProvider")
  }
  return context
}
