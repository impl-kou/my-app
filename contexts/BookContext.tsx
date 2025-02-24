import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Book } from "@/types/models"
import { useSentenceContext } from "./SentenceContext"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"

type BookContextType = {
  books: Book[]
  addBook: (book: Book) => void
  updateBook: (book: Book) => void
  removeBook: (id: string) => void
  getBook: (id: string) => Book | undefined
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const loadBooks = async () => {
      const storedBooks = await AsyncStorage.getItem("books")
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks))
      }
    }
    loadBooks()
  }, [])

  const saveBooks = async (books: Book[]) => {
    await AsyncStorage.setItem("books", JSON.stringify(books))
  }

  const addBook = (book: Book) => {
    const id = books.length > 0 ? stringNumberPlusOne(books[books.length - 1].id) : "1"
    const newBook = { ...book, id } as Book
    console.log("add book ", newBook)
    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
    saveBooks(updatedBooks)
  }

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    )
    setBooks(updatedBooks)
    saveBooks(updatedBooks)
  }

  const removeBook = (id: string) => {
    console.log("remove book", id)
    const updatedBooks = books.filter((book) => book.id !== id)
    setBooks(updatedBooks)
    saveBooks(updatedBooks)
  }

  const getBook = (id: string) => {
    const { getSentencesByBookId } = useSentenceContext()
    const book = books.find((book) => book.id === id)
    if (!book) {
      return undefined
    }
    book.sentences = getSentencesByBookId(id)
    return book
  }

  return (
    <BookContext.Provider
      value={{ books, addBook, updateBook, removeBook, getBook }}
    >
      {children}
    </BookContext.Provider>
  )
}

const stringNumberPlusOne = (str: string) => {
  const num = parseInt(str)
  return (num + 1).toString()
}

export const useBookContext = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider")
  }
  return context
}
