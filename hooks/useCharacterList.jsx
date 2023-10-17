import Character from '../components/Character';

export function useCharacterList(charactersArr) {

    const charactersList = charactersArr.map((character) => (
        <Character key={character.id}
            idCh={character.id}
            nameCharacter={character.name}
            speciesCh={character.species}
            originCh={character.origin.name}
            imageCh={character.image}
        />));
    return (charactersList);
}

export default useCharacterList