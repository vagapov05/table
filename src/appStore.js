import { create } from 'zustand';
import { persist } from 'zustand/middleware';


let appStore = (set) => ({
   rows: [],
   setRows: (rows) => set((state) => ({ rows: rows })),
});

appStore = persist(appStore, {name: 'cdot_store_api'});
export const useAppStore = create(appStore);
