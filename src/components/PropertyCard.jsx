// 物件情報を表示するカード
export function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="property-rent">{property.rent.toLocaleString()}円 / 月</p>
      <p className="property-area">{property.area}</p>
      <p className="property-layout">{property.layout}</p>

      <div className="property-card-actions">
        <button type="button" className="secondary" onClick={() => onEdit(property)}>
          編集
        </button>
        <button type="button" className="danger" onClick={() => onDelete(property)}>
          削除
        </button>
      </div>
    </div>
  )
}
