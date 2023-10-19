import apiUrl from '../data/apiUrl';
import { useCharacterList } from '../hooks/useCharacterList';
import InputDropdown from './components/InputDropdown';
import { notFound } from 'next/navigation';

async function getData(numPage) {
  /* 
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  */
  /* 
  `${apiUrl}?page=${numPage}`
  */
  const res = await fetch(apiUrl + '?page=' + numPage)

  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Home() {
  //let pageData = 1
  //const data = await getData(pageData);
  // const characters = await data.results;

  //const charactersList = useCharacterList(characters);

  return (
    <main className="flex flex-wrap w-full justify-center">
      <InputDropdown />
      {/*  {charactersList} */}
    </main>

  )
}
