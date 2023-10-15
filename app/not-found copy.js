"use client";
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (

        <div className='errorH flex flex-col justify-center items-center'>
            <h2>Ups, tenim problemes!</h2>
            <br />
            {error && error.message && <p>{error.message}</p>}
            <Link href="/personatges/1">
                <span className='underline'> Torna a la pàgina principal</span>
            </Link>
        </div>

    )
}