import { useEffect } from 'react'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose, onInquiry }) {
    useEffect(() => {
        const handler = e => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Close button */}
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                {/* Left side = text */}
                <div className={styles.left}>
                    <h2>{product.name}</h2>
                    <p>{product.long}</p>
                    <button onClick={() => onInquiry(product)} className={styles.btnPrimary}>
                        Inquiry
                    </button>
                </div>

                {/* Right side = image */}
                <div className={styles.right}>
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
        </div>
    )
}
