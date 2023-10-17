import apiUrl from '../data/apiUrl';
import { useCharacterList } from '../hooks/useCharacterList';

async function getData(numPage) {
  const res = await fetch(`${apiUrl}?page=${numPage}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('problema amb dades')
  }
  return res.json();
}

export default async function Home() {
  let pageData = 1
  const data = await getData(pageData);
  const characters = await data.results;

  const charactersList = useCharacterList(characters);

  return (
    <main className="flex flex-wrap w-full justify-center">
      {charactersList}
    </main>

  )
}
