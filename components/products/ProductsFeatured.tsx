import Image from 'next/image'

import { useDispatch, } from 'react-redux';
import { increaseItemQuantity } from '../../store/cartSlice';

import { product } from '../../types';
export default function ProductsFeatured({ products }: { products: product[] }) {
    const dispatch = useDispatch();
    // const [products, setProducts]: [products[], any] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const data = await getDocs(collection(db, "products"));

    //         setProducts(data.docs.map((doc) => {
    //             console.log(data);
    //             return {
    //                 id: doc.id,
    //                 data: {
    //                     ...doc.data()
    //                 }
    //             }
    //         }));

    //     })();



    // }, [])

    return (<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products?.map((product) => (
            <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <Image
                        src={product.data.image}
                        alt={product.data.title}
                        width="300" height="300"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href="#">
                                {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                                {product.data.title}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.data.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.data.price}</p>
                </div>
                <button onClick={() => dispatch(increaseItemQuantity(product.id))} className='mt-3 text-sm px-4 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none'>Add to cart</button>
            </div>
        ))}
    </div>);
}