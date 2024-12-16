import { create } from "zustand"

interface IUseFaqTabStore {
  category: string
  categoryList: string[]
  setCategory: (category: string) => void
  setCategoryList: (categoryList: string[]) => void
}

export const useFaqStore = create<IUseFaqTabStore>((set) => ({
  category: "전체",
  categoryList: [],
  setCategory: (category) => set((state) => ({ ...state, category: category })),
  setCategoryList: (categoryList) => set((state) => ({ ...state, categoryList: categoryList })),
}))
