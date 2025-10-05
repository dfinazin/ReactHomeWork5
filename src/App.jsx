import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const App = () => {
    const [products, setProducts] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('Первый колбэк', counter);
        return () => console.log('Второй колбэк', counter);
    }, [counter]);

    const loadProducts = async () => {
        try {
            const responce = await fetch(
                'https://mocki.io/v1/1f5c883c-5f92-4852-9b5a-8d5e836f6bb3',
            );
            if (!responce.ok) {
                throw new Error('Список товаров получить не удалось');
            } else {
                const loadedData = await responce.json();
                setProducts(loadedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <div className={styles.app}>
                {products.map(({ id, name, price }) => {
                    return (
                        <div key={id}>
                            {name} - {price} руб
                        </div>
                    );
                })}
                <button
                    onClick={() => {
                        setCounter(counter + 1);
                    }}
                >
                    {counter}
                </button>
            </div>
        </>
    );
};
