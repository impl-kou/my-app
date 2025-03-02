import { View, StyleSheet, Button } from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"
import { FlatList } from "react-native-gesture-handler"
import { useSentenceContext } from "@/contexts/SentenceContext"
import { useMutableArray } from "@/hooks/useMutableArray"
import { CreateSentenceItem } from "@/components/CreateSentenceItem"
import { SentenceItem } from "@/types/models"

type params = {
  bookId: string
  sentenceId?: string
}
export default function SentenceCreateScreen() {
  const router = useRouter()
  const navigation = useNavigation()
  const { getSentence, updateOrAddSentence } = useSentenceContext()
  const { bookId, sentenceId } = useLocalSearchParams<params>()
  const [changed, setChanged] = useState(false)

  const defaultSentenceItems = sentenceId
    ? getSentence(sentenceId)?.sentenceItems ?? []
    : []

  const { items, updateNthItem, addItem } =
    useMutableArray<SentenceItem>(defaultSentenceItems)

  useEffect(() => {
    console.log("sentenceItems changed!!", items)
    if (items.length !== defaultSentenceItems.length) setChanged(true)
    else {
      const len = items.length
      for (let i = 0; i < len; i++) {
        if (
          items[i].language !== defaultSentenceItems[i].language ||
          items[i].content !== defaultSentenceItems[i].content
        ) {
          setChanged(true)
          return
        }
      }
      setChanged(false)
    }
  }, [items])

  const handleSave = () => {
    updateOrAddSentence(sentenceId, {
      id: sentenceId ?? "",
      bookId: bookId,
      sentenceItems: items,
    })
    router.push(`/book/${bookId}`)
  }

  const headerRight = () =>
    changed ? (
      <View style={styles.headerRight}>
        <Button title="Save" onPress={handleSave} />
      </View>
    ) : null

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    })
  }, [navigation, changed, items])

  return (
    <ThemedView style={styles.container}>
      <ThemedText>SentenceCreateScreen</ThemedText>
      <ThemedText>
        param: book: {bookId} sentence: {sentenceId ?? "null or undefined"}
      </ThemedText>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <CreateSentenceItem
            sentenceItem={item}
            update={updateNthItem(index)}
          ></CreateSentenceItem>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.itemContainer}
      ></FlatList>
      <Button
        title="Add"
        onPress={() => addItem({ language: "", content: "" })}
      ></Button>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    margin: 10,
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 10,
  },
})
