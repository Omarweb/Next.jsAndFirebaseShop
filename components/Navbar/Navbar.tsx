import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import Link from 'next/link'
import { auth } from "../../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { openCart, closeCart, selectIsOpen, cartTotal } from '../../store/cartSlice';
import Image from 'next/image'
import UserBtn from './UserBtn';
import { ShoppingCartIcon } from '@heroicons/react/20/solid'

export default function Navbar() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsOpen);
    const total = useSelector(cartTotal);


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation: { name: string, href: string }[] = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#' },
        { name: 'Marketplace', href: '#' },
        { name: 'Company', href: '#' },
    ]

    const [user, loading] = useAuthState(auth);
    return (

        <div className="px-6 pt-6 lg:px-8">
            <div>
                <nav className="flex h-9 items-center" aria-label="Global">
                    <div className="flex-start lg:min-w-0 lg:flex-1" aria-label="Global">
                        <Link href="/">
                            <span className="sr-only">Your Company</span>

                            <Image className="h-8" src="/images/logo.png" width="40" height="15" alt="" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                                {item.name}
                            </Link>
                        ))}
                    </div>


                    <div className="flex lg:min-w-0 flex-1 justify-end">
                        {!user ?
                            <Link href="/login" className=" inline-block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 align-middle">  Log in</Link>
                            :

                            <UserBtn user={user} />
                        }

                        <button onClick={() => isOpen === false ? dispatch(openCart()) : dispatch(closeCart())} className="ml-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 relative  " ><span className='relative'><ShoppingCartIcon className="inline h-8 w-8 py-1" />
                            <span className="absolute right-0 top--3 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                                {total}
                            </span>
                        </span>
                        </button>

                    </div>
                    <div className="flex flex-2 lg:hidden justify-end">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                </nav>
                <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                        <div className="flex h-9 items-center justify-between">
                            <div className="flex">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </div>
        </div>
    )
}
