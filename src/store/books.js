import { create } from "zustand";

const useBookStore = create((set) => ({
    books: [],
    setBooks : (books) => set({books}),

}))

export default useBookStore