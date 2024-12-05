import logo from '../../public/logo-1.png'
import Image from 'next/image'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
export const Header = () => {
  return (
<header className="bg-black">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <Image src={logo} width={100} height={100}  alt="logo" />
        </a>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-gray-300 transition hover:text-gray-500/75" href="#"> About </a>
            </li>

            <li>
              <a className="text-gray-300 transition hover:text-gray-500/75" href="#"> History </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <p
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
          >
            <LoginLink>Login</LoginLink>
          </p>

          <div className="hidden sm:flex">
            <p
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
            >
              <RegisterLink>Register</RegisterLink>
            </p>
          </div>
        </div>

        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
  )
}




