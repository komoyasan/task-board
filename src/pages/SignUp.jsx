import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setSubmitting(true)

    const { data, error } = await signUp(email, password)

    setSubmitting(false)

    if (error) {
      setErrorMessage('会員登録に失敗しました。' + error.message)
      return
    }

    // Supabaseのメール確認設定が有効な場合はセッションが発行されないため、
    // その場合はログイン画面へ案内する
    if (!data.session) {
      setInfoMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
      return
    }

    navigate('/properties', { replace: true })
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {infoMessage && <p className="info-message">{infoMessage}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? '登録中...' : '会員登録'}
        </button>

        <p className="auth-switch">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
