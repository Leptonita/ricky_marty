import apiUrl from '../../data/apiUrl';
import { useCharacterList } from '../../hooks/useCharacterList';
import InputDropdown from '../components/InputDropdown';
import { notFound } from 'next/navigation';

async function getData(numPage) {
  const res = await fetch(apiUrl + '?page=' + numPage)
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function Home() {

  return (
    <main className="flex flex-wrap w-full justify-center">
      <InputDropdown />
    </main>

  )
}
