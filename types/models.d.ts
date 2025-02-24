export interface Sentence {
  language: string
  content: string
}

export interface SentenceGroup {
  id: number
  sentences: Sentence[]
}

export interface Book {
  id: number
  title: string
  sentenceGroups: SentenceGroup[]|null
}
