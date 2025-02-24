export interface SentenceItem {
  language: string
  content: string
}

export interface Sentence {
  id: string
  bookId: string
  sentenceItems: SentenceItem[]
}

export interface Book {
  id: string
  title: string
  sentences: Sentence[]
}
