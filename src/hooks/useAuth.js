import { useContext } from 'react'
import { AuthContext } from '../contexts/authContextInstance'

// AuthContextを利用するためのカスタムフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの内部で使用してください')
  }
  return context
}
