"use client";
import { useState, useEffect, Suspense } from "react";
import apiUrl from "../../data/apiUrl";
import { useCharacterList } from '../../hooks/useCharacterList';
import Link from 'next/link';
import LinksRound from './LinksRound';
import LoaderSpiner from "./LoaderSpiner";
import { notFound } from 'next/navigation';

async function getData(numPage) {
  const res = await fetch(apiUrl + '?page=' + numPage)
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

async function getDataAllCharcSearched(inputText) {

  const charactersFound = []
  for (let i = 1; i < 43; i++) {
    const charactersPagRes = await fetch(apiUrl + '?page=' + i);
    if (!charactersPagRes.ok) {
      notFound();
    }
    const characterPagJson = await charactersPagRes.json();
    const resCharacterPagArr = characterPagJson.results;

    for (let j = 0; j < resCharacterPagArr.length - 1; j++) {
      if (resCharacterPagArr[j].name.toLowerCase().includes(inputText.toLowerCase())) {
        const characterFound = resCharacterPagArr[j];
        //console.log("characterFound", characterFound);
        charactersFound.push(characterFound);
      }
      j++;
    }
  }
  console.log("charactersFound", charactersFound);
  return charactersFound;
}

const InputDropdown = () => {
  const [inputText, setInputText] = useState("");
  const [allCharactersFound, setAllCharactersFound] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function startFetching() {
      const charactersPageOne = await getData('1');
      const charactersPageOneArr = await charactersPageOne.results;
      if (!ignore) {
        setAllCharactersFound(charactersPageOneArr);
      }
    }
    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }

  }, []);

  useEffect(() => {
    isClicked ? setInputText("") : setInputText(inputText);
  }, [isClicked]);

  const inputHandler = async (e) => {
    //convert input texts and names to lower case to compare
    const inputLowerCase = e.target.value.toLowerCase();
    setInputText(inputLowerCase);
    if (inputLowerCase.length >= 3) {
      setIsLoading(true);
      const allFoundArr = await getDataAllCharcSearched(inputLowerCase);
      setAllCharactersFound(allFoundArr);
      setIsLoading(false);
    }
  };

  const charactersList = useCharacterList(allCharactersFound);
  console.log("charactersList", charactersList);

  return (
    <>
      <div>
        <label htmlFor="datos" className=""><strong>Buscar personatge: </strong> </label>
        <input className="px-3 py-1 m-2 w-64 rounded text-slate-700"
          type="text"
          list="personatges"
          id="datos"
          name="datos"
          placeholder="escriu el nom del personatge"
          onChange={inputHandler}
          onClick={() => setIsClicked(!isClicked)} value={inputText} autoFocus
        />
        <datalist id="personatges">
          {(inputText.length >= 3) &&
            allCharactersFound.map(item => {
              return <option key={item.id} >{item.name.toLowerCase()}</option>
            })
          }
        </datalist>
      </div>

      <main id="foundCharacters" className="mt-5 flex flex-wrap w-full min-h-[300px] justify-center">
        {isLoading && <LoaderSpiner />}
        {!isLoading && charactersList}

        {(inputText != "" && allCharactersFound.length === 0 && !isLoading) && <p className="text-red-500">no hem trobat cap personatge</p>}

      </main>
      {!isLoading && <div className='flex justify-center items-end m-5'>
        <LinksRound className="text-lg">
          <Link href="#topnav"> ^ </Link>  </LinksRound>
      </div>}
      {inputText.length === 0 && <div className='flex justify-center items-end m-5'>
        <LinksRound className="text-lg">
          <Link href="/personatges/2"> + </Link>  </LinksRound>
      </div>}
    </ >
  )
}
export default InputDropdown;