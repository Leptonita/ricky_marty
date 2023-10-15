import Character from "../../../components/Character";

async function getData(numPage) {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${numPage}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.


    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function PersonatgesPage({ params }) {

    // console.log(params);
    /*   const paginaNum = ((params && params.pagina > 1 && params.pagina < 43) ? params.pagina : 1) */

    let paginaNum;
    if (params) {
        if (params.pagina > 1 && params.pagina < 43) {
            paginaNum = params.pagina;
        } else if (params.pagina > 43) {
            paginaNum = 42;
        } else {
            paginaNum = 1;
        }
    } else {
        paginaNum = 1;
    }

    console.log(paginaNum);
    const data = await getData(paginaNum);
    const totalCharacters = await data.info.count;

    console.log(totalCharacters);
    const characters = await data.results;

    const charactersList = characters.map((character) => (
        < Character key={character.id}
            idCh={character.id}
            nameCharacter={character.name}
            speciesCh={character.species}
            originCh={character.origin.name}
            imageCh={character.image}
        />));



    return (

        <main className="flex flex-wrap w-full justify-center">
            {charactersList}

        </main>

    )
}
