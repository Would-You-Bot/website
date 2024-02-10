import { motion, AnimatePresence } from "framer-motion";

const CloseIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-[#5A5B5E]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.313 1 9.749 7.563 3.187 1 1 3.188 7.562 9.75 1 16.313 3.187 18.5l6.562-6.563 6.564 6.563 2.187-2.188-6.562-6.562L18.5 3.187 16.313 1Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
const CheckArrowIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-[#5A5B5E]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.313 1 9.749 7.563 3.187 1 1 3.188 7.562 9.75 1 16.313 3.187 18.5l6.562-6.563 6.564 6.563 2.187-2.188-6.562-6.562L18.5 3.187 16.313 1Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export const PremiumModal = ({ setIsOpen, type }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, zIndex: 50 }}
      animate={{ opacity: 1, zIndex: 50 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="fixed left-0  top-0 z-50 flex h-full w-full  items-center justify-center bg-customDarkBgTransparentDarker"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="custom-border-gray-darker fixed z-50 mx-auto h-screen w-full overflow-y-hidden bg-customDarkBgTransparentDarker px-8 py-12 backdrop-blur-xl sm:mb-8 sm:h-auto sm:w-3/4 sm:rounded-2xl sm:px-16 md:w-3/5 lg:w-[1000px] xl:w-[1100px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex">
            <div className="hidden w-1/2 lg:inline">
              <h2 className="mb-2 mt-6 text-5xl font-bold tracking-normal text-white">
                Subscribe Now
              </h2>
              <h2 className="text-5xl font-bold tracking-normal text-customSecondary">
                Winter is coming
              </h2>

              <ul className="mb-6 mt-12 text-white">
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Vestibulum viverra</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Morbi mollis metus pretium</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Etiam lectus nunc, commodo</span>
                </li>
              </ul>
            </div>
            <div className="flex w-full flex-col items-center justify-center pt-24 sm:pt-0 lg:w-1/2">
              <div className="mb-8 flex grow basis-0 items-center justify-start pr-6 lg:hidden">
                <div className="mr-2 text-8xl text-white"></div>
                <div className="font-['Inter'] text-3xl font-bold text-white">
                  Tailcast
                </div>
              </div>

              <h3 className="mb-7 text-center text-2xl font-bold leading-snug text-white">
                Join 3,953 other developers
              </h3>
              <div className="-m-2 flex flex-wrap">
                <div className="mx-auto w-full p-2 sm:w-4/5">
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-gray-300 px-4 py-4 text-center font-medium text-gray-500 placeholder-gray-500 outline-none focus:ring focus:ring-indigo-300"
                    id="newsletterInput3-1"
                    type="text"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mx-auto mt-4 w-full p-2 sm:w-4/5">
                  <button
                    className="shadow-4xl w-full rounded-xl bg-customPrimary px-6 py-4 font-semibold text-white transition duration-200 ease-in-out hover:bg-[#7274f3] focus:ring focus:ring-indigo-300"
                    type="button"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed right-6 top-6 z-50 h-5 w-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);
