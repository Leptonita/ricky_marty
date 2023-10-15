import Character from "../components/Character";

async function getData(numPage) {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${numPage}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export default async function Home() {
  let pageData = 1
  const data = await getData(pageData);
  const characters = await data.results;

  const charactersList = characters.map((character) => (
    <Character key={character.id}
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
