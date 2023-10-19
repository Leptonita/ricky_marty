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
        <nav id="topnav" className="flex flex-wrap justify-center my-7 ">
            <ul className="flex flex-wrap justify-center bg-slate-500 bg-opacity-20 p-2
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
            </ul>
        </nav>
    )
}

export default Nav;