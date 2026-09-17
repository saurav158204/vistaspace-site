import { create } from 'zustand'

interface UIState {
  /** Mobile nav sheet */
  navOpen: boolean
  setNavOpen: (open: boolean) => void
  toggleNav: () => void

  /** True until the first 3D canvas on the site has reported itself ready. */
  booting: boolean
  finishBoot: () => void
}

export const useUIStore = create<UIState>((set) => ({
  navOpen: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),

  booting: true,
  finishBoot: () => set({ booting: false }),
}))
