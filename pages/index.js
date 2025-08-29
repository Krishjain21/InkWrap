import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import products from '../data/products'
import styles from './index.module.css'

const OWNER = {
    name: 'Vansh Khurana',
    phone: '9582132261',
    email: 'inkwrapsolutions@gmail.com'
}

function readCookie() {
    try {
        const raw = document.cookie.split('; ').find(r => r.startsWith('inkwrap_user='))
        if (!raw) return null
        return JSON.parse(decodeURIComponent(raw.split('=')[1]))
    } catch { return null }
}

function setCookie(user) {
    const val = encodeURIComponent(JSON.stringify(user))
    const d = new Date(); d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000))
    document.cookie = `inkwrap_user=${val}; expires=${d.toUTCString()}; path=/`
}

export default function Home() {
    const [selected, setSelected] = useState(null)
    const [signupOpen, setSignupOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => { const u = readCookie(); if (u) setUser(u) }, [])

    const handleSignup = e => {
        e.preventDefault()
        const form = e.target
        const u = { name: form.name.value.trim(), email: form.email.value.trim() }
        if (!u.name || !u.email) return alert('Enter name & email')
        setUser(u); setCookie(u); setSignupOpen(false)
    }

    const handleInquiry = product => {
        const subject = encodeURIComponent(`Inquiry - ${product.name}`)
        const userPart = user ? `${user.name} (${user.email})` : ''
        const body = encodeURIComponent(
            `Owner: ${OWNER.name}\nEmail: ${OWNER.email}\nPhone: ${OWNER.phone}\n\nProduct: ${product.name}\n\nFrom: ${userPart}`
        )
        window.location.href = `mailto:${OWNER.email}?subject=${subject}&body=${body}`
    }

    return (
        <div>
            <Head><title>InkWrap Catalog</title></Head>
            <Header user={user} onOpenSignup={() => setSignupOpen(true)} />

            <main className={styles.container}>
                <section className={styles.hero}>
                    <img src="/images/hero.jpg" alt="Hero" className={styles.heroImg} />
                    <div className={styles.heroDesc}>
                        <h1>Welcome to InkWrap Solutions</h1>
                        <p>Premium packaging solutions — customizable, durable, and designed for your needs.</p>
                    </div>
                </section>
                {/* ✅ Only products grid on front page */}
                <section className={styles.products}>
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
                    ))}
                </section>

                {/* Product modal */}
                {selected && (
                    <ProductModal
                        product={selected}
                        onClose={() => setSelected(null)}
                        onInquiry={handleInquiry}
                    />
                )}

                {/* Signup modal */}
                {signupOpen && (
                    <div className={styles.overlay} onClick={() => setSignupOpen(false)}>
                        <div className={styles.signup} onClick={e => e.stopPropagation()}>
                            <h3>Sign up</h3>
                            <form onSubmit={handleSignup} className={styles.form}>
                                <label>Name</label>
                                <input name="name" defaultValue={user?.name || ''} />
                                <label>Email</label>
                                <input name="email" defaultValue={user?.email || ''} />
                                <div className={styles.actions}>
                                    <button type="submit" className={styles.btnPrimary}>Save</button>
                                    <button type="button" className={styles.btnGhost} onClick={() => setSignupOpen(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <footer id="contact" className={styles.footer}>
                    <p>{OWNER.name} · {OWNER.phone} · {OWNER.email}</p>
                </footer>
            </main>
        </div>
    )
}
