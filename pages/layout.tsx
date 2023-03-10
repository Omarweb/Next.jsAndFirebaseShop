import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import styles from '../styles/Home.module.css'
import Cart from '../components/Cart/Cart'
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Next.js Shop</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className={styles.container}>
                <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    {children}
                </main>
            </div>
            <Cart />

            <footer className={styles.footer}>
                <a
                    href="https://github.com/Omarweb"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Omar Hussien{' '}
                    <span className={styles.logo}>
                        <Image src="/github.svg" className='mt--1' alt="Github Omar web" width={20} height={16} />
                    </span>
                </a>
            </footer>

        </>
    )
}