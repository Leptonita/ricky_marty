"use client";
import { useState, useEffect, Suspense } from "react";
import apiUrl from "../../data/apiUrl";
import { useCharacterList } from '../../hooks/useCharacterList';
import Link from 'next/link';
import LinksRound from './LinksRound';
import LoaderSpiner from "./LoaderSpiner";
import { notFound } from 'next/navigation';
import UpArrow from './UpArrow';

async function getData(numPage) {
  const res = await fetch(apiUrl + '?page=' + numPage, {
    next: {
      revalidate: 1
    }
  })

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
      const characterNameLow = resCharacterPagArr[j].name.toLowerCase();
      if (characterNameLow.includes(inputText.toLowerCase())) {
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
    if (inputText.length === 0) {
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
    }

  }, [inputText]);

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
      <div className="flex flex-col md:flex-row justify-center items-center mt-6">
        <label htmlFor="datos" className="text-lime-400 font-light"><strong>Buscar personatge: </strong> </label>
        <input className="px-3 py-1 m-2 w-64 rounded-2xl text-slate-700 shadow-sm"
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

      <main id="foundCharacters" className="mt-6 md:mt-9 flex flex-wrap w-full min-h-[300px] justify-center">
        {isLoading && <LoaderSpiner />}
        {!isLoading && charactersList}

        {(inputText != "" && allCharactersFound.length === 0 && !isLoading) && <p className="text-red-500">no hem trobat cap personatge</p>}

      </main>
      {!isLoading && <div className='flex justify-center items-end m-5'>
        <LinksRound >
          <Link href="#topnav">
            <UpArrow />
          </Link>  </LinksRound>
      </div>}
      {inputText.length === 0 && <div className='flex justify-center items-end m-5'>

        <Link href="/personatges/2" className="font-bold text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" className="fill-rose-700 hover:fill-white bg-lime-500 rounded-full p-2 "><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" /></svg>
        </Link>
      </div>}
    </ >
  )
}
export default InputDropdown;