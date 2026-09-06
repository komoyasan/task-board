import { useEffect, useState } from 'react'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyForm } from '../components/PropertyForm'
import { useAuth } from '../hooks/useAuth'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../lib/properties'

export function Properties() {
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  // 編集中の物件ID（nullなら編集していない）
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件の取得に失敗しました。' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  // 新規登録フォームの送信処理
  const handleCreate = async (values) => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      const created = await createProperty({ ...values, userId: user.id })
      setProperties((prev) => [created, ...prev])
      setIsCreating(false)
    } catch (error) {
      setErrorMessage('物件の登録に失敗しました。' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  // 編集フォームの送信処理
  const handleUpdate = async (id, values) => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      const updated = await updateProperty(id, values)
      setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
      setEditingId(null)
    } catch (error) {
      setErrorMessage('物件の更新に失敗しました。' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  // 削除ボタンの処理
  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return

    setErrorMessage('')
    try {
      await deleteProperty(property.id)
      setProperties((prev) => prev.filter((p) => p.id !== property.id))
    } catch (error) {
      setErrorMessage('物件の削除に失敗しました。' + error.message)
    }
  }

  return (
    <div className="properties-page">
      <header className="properties-header">
        <div>
          <h1>物件一覧</h1>
          <p className="user-email">{user?.email}</p>
        </div>
        <button type="button" onClick={signOut}>
          ログアウト
        </button>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isCreating && !editingId && (
        <div className="properties-toolbar">
          <button type="button" onClick={() => setIsCreating(true)}>
            物件を登録
          </button>
        </div>
      )}

      {isCreating && (
        <PropertyForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
          submitting={submitting}
        />
      )}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <PropertyForm
                key={property.id}
                initialValues={property}
                onSubmit={(values) => handleUpdate(property.id, values)}
                onCancel={() => setEditingId(null)}
                submitting={submitting}
              />
            ) : (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={(p) => setEditingId(p.id)}
                onDelete={handleDelete}
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
