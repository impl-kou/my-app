import { AnswerInput } from "@/components/AnswerInput"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { bookData } from "@/data/bookData"
import React, { useRef } from "react"
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
  StatusBar,
} from "react-native"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export type SentenceType = { language: string; content: string }
type SentenceProps = { sentence: SentenceType }

const Sentence = ({ sentence }: SentenceProps) => (
  <ThemedView style={styles.sentence}>
    <ThemedText style={styles.language}>{sentence.language}</ThemedText>
    <ThemedText style={styles.content}>{sentence.content}</ThemedText>
  </ThemedView>
)

const SentenceGroup = ({ sentences }: { sentences: SentenceType[] }) => (
  <View>
    <FlatList
      style={styles.sentenceGroup}
      data={sentences}
      renderItem={({ item }) => <Sentence sentence={item} />}
      keyExtractor={(item) => item.language}
    />
    <AnswerInput sentence={sentences[0]} />
  </View>
)

export default function SentencesScroll() {
  const scrollY = useRef(new Animated.Value(0)).current

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.itemContainer,
        { backgroundColor: item.color },
        {
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [
                  (index - 1) * SCREEN_HEIGHT,
                  index * SCREEN_HEIGHT,
                  (index + 1) * SCREEN_HEIGHT,
                ],
                outputRange: [0.9, 1, 0.9],
                extrapolate: "clamp",
              }),
            },
          ],
        },
      ]}
    >
      {/* <Text style={styles.text}>{item.title}</Text> */}
      <SentenceGroup sentences={item.sentences} />
    </Animated.View>
  )

  return (
    <Animated.FlatList
      data={bookData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={SCREEN_HEIGHT}
      decelerationRate="fast"
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    />
  )
}

export const styles = StyleSheet.create({
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
    width: 50, // Adjusted width for both webpage and mobile screen
    lineHeight: 40,
  },
  content: {
    fontSize: 32,
    lineHeight: 40,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
})
