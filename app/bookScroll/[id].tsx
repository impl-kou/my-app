import { Sentence } from "@/components/Sentence"
import { ThemedView } from "@/components/ThemedView"
import { bookData } from "@/data/bookData"
import React, { useRef, useState } from "react"
import {
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
} from "react-native"
import AnswerInput from "@/components/AnswerInput"
import { useThemeColor } from "@/hooks/useThemeColor"

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window")

export default function SentencesScroll() {
  const scrollY = useRef(new Animated.Value(0)).current
  const [currentItem, setCurrentItem] = useState(bookData[0])

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.itemContainer,
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
      <ScrollView style={{ height: SCREEN_HEIGHT, backgroundColor: "pink" }}>
        <Sentence sentence={item} />
      </ScrollView>
    </Animated.View>
  )

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.y / SCREEN_HEIGHT)
    setCurrentItem(bookData[index])
  }

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={{ backgroundColor: "orange" }}
        style={{ backgroundColor: "blue" }}
        data={bookData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
      />
      {/* <AnswerInput
        sentenceItem={currentItem.sentenceItems[0]}
        style={styles.answerInput}
      /> */}
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
  },
  itemContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "green",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  answerInput: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
  },
})
