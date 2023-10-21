import Link from 'next/link';
import apiUrl from '../../../data/apiUrl';
import { useCharacterList } from '../../../hooks/useCharacterList';
import LinksRound from '../../components/LinksRound';
import UpArrow from '../../components/UpArrow';
import { notFound } from "next/navigation";

async function getData(numPage) {
    const res = await fetch(`${apiUrl}?page=${numPage}`)
    if (!res.ok) {
        notFound();
        // This will activate the closest `error.js` Error Boundary
        //throw new Error('... problema amb dades')
    }
    return res.json()
}

export default async function PersonatgesPage({ params }) {

    // console.log(params);
    /*   const paginaNum = ((params && params.pagina > 1 && params.pagina < 43) ? params.pagina : 1) */
    let limit = 42;
    let paginaNum;
    if (params) {
        if (params.pagina > 1 && params.pagina <= limit) {
            paginaNum = params.pagina;
        } else if (params.pagina > limit + 1) {
            paginaNum = limit;
        } else {
            paginaNum = 1;
        }
    } else {
        paginaNum = 1;
    }

    const data = await getData(paginaNum);
    const totalCharacters = await data.info.count;
    const characters = await data.results;
    const charactersList = useCharacterList(characters);

    return (
        <>

            <main id="charlist" className="flex flex-wrap w-full justify-center">
                {charactersList}
            </main>
            <div className='flex justify-center m-5'>
                <LinksRound>
                    <Link href="#topnav">
                        <UpArrow />
                    </Link>  </LinksRound>
            </div>

        </>
    )
}
