import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from './authContextInstance'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション取得が完了するまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 現在のセッションを取得
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなど認証状態の変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
      },
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // メールアドレス＋パスワードでの会員登録
  const signUp = (email, password) => {
    return supabase.auth.signUp({ email, password })
  }

  // メールアドレス＋パスワードでのログイン
  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  // ログアウト
  const signOut = () => {
    return supabase.auth.signOut()
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
