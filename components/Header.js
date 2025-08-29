import { useState } from 'react'
import styles from './Header.module.css'

export default function Header({ user, onOpenSignup }) {
    const [open, setOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img src="/images/logo.jpg" alt="InkWrap" />
                    <span>InkWrap</span>
                </div>

                {/* Desktop links */}
                <nav className={styles.links}>
                    <a href="#contact">Contact Us</a>
                    {user ? (
                        <span className={styles.userName}>{user.name}</span>
                    ) : (
                        <button onClick={onOpenSignup} className={styles.btnLink}>
                            Account / Sign up
                        </button>
                    )}
                </nav>

                {/* Hamburger (mobile) */}
                <button
                    className={styles.hamburger}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className={styles.mobileMenu}>
                    <a href="#contact" onClick={() => setOpen(false)}>Contact Us</a>
                    {user ? (
                        <span className={styles.userName}>{user.name}</span>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false)
                                onOpenSignup()
                            }}
                            className={styles.btnLink}
                        >
                            Account / Sign up
                        </button>
                    )}
                </div>
            )}
        </header>
    )
}
