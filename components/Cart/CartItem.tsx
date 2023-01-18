import { SetStateAction, useEffect, useState } from "react"
import { db } from "../../firebase/firebaseApp";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';

interface item {
    id: string,
    quantity: number
}
interface product {
    image: string,
    title: string,
    price: number,
    color: string
}

export default function CartItem({ item, setCartTotal }: { item: item, setCartTotal: any }) {
    const dispatch = useDispatch()
    const [product, setProduct]: [product, any] = useState({
        image: '',
        title: '',
        price: 0,
        color: ''
    });

    useEffect(() => {

        (async () => {
            const docRef = doc(db, "products", item.id);
            const data = await getDoc(docRef);

            if (data.exists()) {
                setProduct(data.data());
                setCartTotal((total: number) => total + Number(data.data().price) * item.quantity)
            }
            else
                dispatch(removeFromCart(item.id));
        })();
        return () => {
            setCartTotal(0)
        }

    }, [])


    return (<li key={item.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center"
            />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
            <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                        <a href="#">{product.title}</a>
                    </h3>
                    <p className="ml-4">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {item.quantity}</p>

                <div className="flex">
                    <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </li>)
}