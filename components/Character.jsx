
const Character = ({ idCh, nameCharacter, speciesCh, originCh, imageCh }) => {

    return (
        <div className="m-6 pb-12 sm:pb-9 bg-emerald-600 bg-opacity-70 flex flex-col items-center justify-start text-center w-7/12 sm:w-56 border-4 border-lime-300 rounded-lg min-h-max">

            <img src={imageCh} alt={nameCharacter} width={100} height={100} className="rounded-full border border-lime-700 w-8/12 h-8/12 -mt-7 mx-auto shadow-lg " />

            <div className="mt-4 px-1  font-bold text-white">{nameCharacter}</div>
            <div className="px-1 font-light italic">{(speciesCh === 'unknown') ? speciesCh + " species" : speciesCh}</div>
            <div className="px-1 text-sm">{(originCh === 'unknown') ? 'unknow origin' : originCh}</div>

        </div>
    )
}

export default Character;