import styles from './ProductCard.module.css'

export default function ProductCard({ product, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
        </div>
    )
}
