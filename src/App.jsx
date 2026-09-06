import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'
import { Properties } from './pages/Properties'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <Properties />
          </ProtectedRoute>
        }
      />
      {/* それ以外のパスは物件一覧へ（未ログインならログイン画面へリダイレクトされる） */}
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
