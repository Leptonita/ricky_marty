

const Character = ({ idCh, nameCharacter, speciesCh, originCh, imageCh }) => {

    return (
        <div className="m-5 pb-12 sm:pb-9 bg-emerald-600 bg-opacity-70 flex flex-col items-center justify-center text-center w-7/12 sm:w-56 border-4 border-lime-300 rounded-lg">

            <img src={imageCh} alt={nameCharacter} className="rounded-full w-8/12 -mt-7 mx-auto" />

            <div className="mt-4">{nameCharacter}</div>
            <div>{speciesCh}</div>
            <div>{originCh}</div>
        </div>
    )
}

export default Character;