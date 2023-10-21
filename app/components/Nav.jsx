"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LinksRound from './LinksRound';

const Nav = () => {

    const pathname = usePathname();
    const numPage = Number(pathname.split("/")[2]);

    let numArray = [];
    if (numPage > 0 && numPage < 37) {
        for (let i = numPage + 1; i < numPage + 6; i++) {
            numArray.push(i);
        }
    } else if (numPage >= 37) {
        numArray = [38, 39, 40, 41, 42];
    } else {
        numArray = [2, 3, 4, 5, 6];
    }

    const numLinks = numArray.map((num) => (
        <LinksRound key={num} >
            <Link href={`/personatges/${num}`}>{num}</Link>
        </LinksRound>
    ));

    return (
        <nav id="topnav" className="flex flex-wrap justify-center mt-2 mb-7 ">
            <ul className="flex flex-wrap justify-center items-center bg-slate-500 bg-opacity-20 p-2
            rounded-full shadow-lg ">
                {(numPage > 1 && numPage < 37) &&
                    (<>
                        <LinksRound className="text-xs">
                            <Link href={`/personatges/${numPage - 1}`}> {"<"} </Link>
                        </LinksRound>
                        <span> ...</span>
                    </>
                    )}

                {numPage >= 37 &&
                    (<>
                        <LinksRound className="text-xs">
                            <Link href={`/personatges/36`}> {"<"} </Link>
                        </LinksRound>
                        <span> ...</span>
                    </>)
                }

                {numLinks}
                {numPage == 1 &&
                    (<>
                        <span> ... </span>
                        <LinksRound className="text-xs">
                            <Link href={`/personatges/20`}> {"20"} </Link>
                        </LinksRound>

                    </>)
                }
                ...
                <div>
                    <Link href="/" className='w-9 h-9'>
                        <svg className="fill-rose-700 hover:fill-white bg-lime-500 rounded-2xl p-1 m-2" xmlns="http://www.w3.org/2000/svg" height="33" viewBox="0 -960 960 960" width="33"><path d="M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45L940-76l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38H120Zm320-480Zm-33 400Z" /></svg>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}

export default Nav;