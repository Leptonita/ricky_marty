"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const Nav = () => {

    const pathname = usePathname();
    const numPage = Number(pathname.split("/")[2]);
    console.log("par", numPage);

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
        <li key={num} className='mx-4 underline'>
            <Link href={`/personatges/${num}`}>{num}</Link>
        </li>
    ));

    return (
        <nav className="flex flex-wrap justify-center my-7">
            <ul className="flex flex-wrap justify-center">
                {(numPage > 1 && numPage < 37) &&
                    (<>
                        <li className='mx-4 underline'>
                            <Link href={`/personatges/${numPage - 1}`}>{numPage - 1}</Link>
                        </li>
                        <span> ...</span>
                    </>
                    )}

                {numPage >= 37 &&
                    (<>
                        <li className='mx-4 underline'>
                            <Link href={`/personatges/36`}>36</Link>
                        </li>
                        <span> ...</span>
                    </>)
                }


                {numLinks}
            </ul>
        </nav>
    )
}

export default Nav;