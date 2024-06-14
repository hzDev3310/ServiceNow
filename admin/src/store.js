import { create } from 'zustand'

const useIsLogin = create((set) => ({
    isLogin: 0,
    setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
   
  }))
  const useUser = create((set) => ({
    user: {},
    setUser: (u) => set(() => ({ user:u  })),
   
  }))

  export {useIsLogin,useUser}