import Character from "@/components/Character";

async function getData() {
  const res = await fetch('https://rickandmortyapi.com/api/character?page=1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData();
  const characters = await data.results;

  const charactersList = characters.map((character) => (
    < Character key={character.id}
      idCh={character.id}
      nameCharacter={character.name}
      speciesCh={character.species}
      originCh={character.origin.name}
      imageCh={character.image}
    />

  ));

  return (<container>
    <div className="flex w-full justify-center my-5"><img src="rick_and_morty.png" alt="Logo Rick and Morty" className="w-8/12 sm:w-5/12 max-w-sm" /></div>

    <main className="flex flex-wrap w-full justify-center">
      {charactersList}
    </main>
  </container>
  )
}
