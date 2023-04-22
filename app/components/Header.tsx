import Navbar from "./Navbar";
import MenuButton from "./MenuButton";
import HeaderRight from "./HeaderRight";
import { GithubIcon } from "./Icons";

function Header() {
  return (
    <header className="bg-inherit max-w-7xl mx-auto pt-10 md:pt-20 px-2 sm:px-4 md:px-10 space-y-4">
      <div className="flex gap-2 md:gap-3 items-center justify-between">
        <div className="hidden md:flex gap-x-4 ">
          <a href="https://www.facebook.com/lekhanhhhhh">
            <span className="w-11 h-11 flex items-center justify-center transition-all hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="#175beb"
                className="w-6 h-6"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </span>
          </a>

          <a href="https://github.com/lekhanh240895">
            <span className="w-11 h-11 flex items-center justify-center transition-all hover:-translate-y-1">
              <GithubIcon width="1.5rem" height="1.5rem" />
            </span>
          </a>

          <a href="https://www.instagram.com/khanhchristian">
            <span className="w-11 h-11 flex items-center justify-center transition-all hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6"
                fill="#ef00a2"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </a>
        </div>

        <MenuButton />

        <h1 className="hidden text-blue-900 xl:flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl gap-x-1 md:gap-x-2 items-baseline transition-all hover:-translate-y-1">
          KhanhReview
          <span className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-primary" />
        </h1>

        <HeaderRight />
      </div>

      <h1 className="flex text-blue-900 xl:hidden justify-center items-baseline text-4xl sm:text-5xl lg:text-7xl gap-x-1 md:gap-x-2 transition-all hover:-translate-y-1">
        KhanhReview
        <span className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-primary" />
      </h1>

      {/* @ts-expect-error Async Server Component */}
      <Navbar />
    </header>
  );
}

export default Header;
