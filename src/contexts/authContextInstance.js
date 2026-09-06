import { createContext } from 'react'

// 認証状態（ログインユーザー情報）をアプリ全体で共有するためのContext
export const AuthContext = createContext(undefined)
