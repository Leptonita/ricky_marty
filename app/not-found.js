"use client";
import { useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (

        <div className='errorH flex flex-col justify-center items-center'>
            <h2>404 - Ups, no trobem el que ens demanes ;(</h2>
            <br />
            <Link href="/personatges/1">
                <span className='underline'> Torna a la pàgina principal</span>
            </Link>
        </div>

    )
}