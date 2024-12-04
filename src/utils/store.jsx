import { create } from 'zustand'

const useStore = create((set) => ({

    skin: null,
    setSkin: (param) => set({ 
        skin: param
    }),

    mode: [],
    addMode: (param) =>
        set((state) => ({
            mode: [...state.mode, param]
        })),
    removeMode: (param) =>
        set((state) => ({
            mode: state.mode.filter((_mode) => _mode !== param)
        }))
}));

export default useStore;