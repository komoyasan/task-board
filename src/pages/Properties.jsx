import { useAuth } from '../hooks/useAuth'
import { dummyProperties } from '../data/dummyProperties'

export function Properties() {
  const { user, signOut } = useAuth()

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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">
              {property.rent.toLocaleString()}円 / 月
            </p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
