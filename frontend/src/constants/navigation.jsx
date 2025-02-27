import { MdHome } from "react-icons/md";
import { LuTvMinimal } from "react-icons/lu";
import { RiMovie2Fill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
    {
        label: 'Tv shows',
        href: 'tv',
        icon : <LuTvMinimal />
    },
    {
        label: 'Movies',
        href: 'movie',
        icon : <RiMovie2Fill />
    }
]

export const mobileNav = [
    {
        label : 'Home',
        href : '/',
        icon : <MdHome />
    },
    ...navigation,
    {
        label : 'search',
        href : '/search',
        icon : <IoSearchOutline />
    }
]