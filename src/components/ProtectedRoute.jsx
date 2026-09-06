import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// 未ログインの場合はログイン画面へリダイレクトするラッパーコンポーネント
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
