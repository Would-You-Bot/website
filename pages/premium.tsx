import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

const CheckArrowIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-customPrimary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.383 4.117a1.252 1.252 0 0 1 0 1.77l-10 10a1.252 1.252 0 0 1-1.77 0l-5-5a1.252 1.252 0 0 1 1.77-1.77L7.5 13.23l9.117-9.113a1.252 1.252 0 0 1 1.77 0h-.004Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
const XIcon = () => (
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

type PricingData = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const pricingData: PricingData = {
  freemium: {
    "Seamless integration": true,
    "Real-time data visualization": true,
    "Advanced predictive analytics": false,
    "Collaborative environment": false,
    "Responsive customer support": false,
  },
  premium: {
    "Seamless integration": true,
    "Real-time fortnite data visualization": true,
    "Advanced predictive analytics": true,
    "Collaborative environment": true,
    "Responsive customer support": true,
  },
  premiumAI: {
    "Seamless integration": true,
    "Real-time data visualization": true,
    "Advanced predictive analytics": true,
    "Collaborative environment": true,
    "Responsive customer support": true,
  },
};

export default function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleChange = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <main className="relative flex w-screen justify-center bg-customDarkBg2 px-8 xl:px-[17vw]">
      <div className="bg-customDarkBg2 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h1 className="mt-36 text-4xl font-bold text-yellow-500 drop-shadow-gold-glow">
              Premium
            </h1>
            <p className="mb-6 text-customGrayText">
              Select the plan that suits your needs and benefit from our discord
              bot.
            </p>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <label className="group relative mx-auto flex h-12 w-44 cursor-pointer items-center justify-between rounded-lg bg-customDarkBg3 pl-1 pr-36 text-xl">
                <input
                  type="checkbox"
                  className="peer appearance-none"
                  checked={!isMonthly}
                  onChange={handleChange}
                />
                <span className="flex h-8 w-[5.5rem] cursor-pointer items-center pr-2 duration-300 ease-in-out  after:h-10 after:w-[30rem]  after:rounded-lg after:bg-customPrimary after:shadow-md after:duration-300 peer-checked:after:translate-x-[5.5rem]"></span>
                <div className="absolute flex text-sm font-bold text-white">
                  <div
                    className={
                      isMonthly ? "ml-3 mr-9" : "ml-3 mr-9 text-gray-400"
                    }
                  >
                    Monthly
                  </div>
                  <div className={(isMonthly && "text-gray-400") as string}>
                    Yearly
                  </div>
                </div>
              </label>
            </div>
            <div className="-mx-4 mt-20 flex flex-col flex-wrap items-center lg:flex-row">
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="rounded-3xl bg-customDarkBg3 p-8">
                  <h4 className="font-heading mb-2 text-left text-xl font-bold text-white">
                    Freemium
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
                      $0
                    </div>
                    <div className="text-gray-500">
                      {isMonthly ? "/ month" : "/ year"}
                    </div>
                  </div>

                  <p className="mb-6 mt-4 text-left leading-loose text-gray-500 2xl:mb-10">
                    The perfect way to get started and get used to our tools.
                  </p>
                  <ul className="mb-2 text-white 2xl:mb-6">
                    {Object.keys(pricingData["freemium"]).map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        {pricingData["freemium"][text] ? (
                          <CheckArrowIcon />
                        ) : (
                          <XIcon />
                        )}
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-16 w-full justify-center rounded-xl bg-customDarkBg1 px-4 py-2 font-bold leading-loose"
                    onClick={() => {
                      window.open("/invite");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="rounded-3xl bg-customDarkBg3 px-8 py-8">
                  <h4 className="font-heading mb-2 text-left text-2xl font-bold text-white 2xl:mb-4">
                    Premium
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
                      {isMonthly ? "$2.99" : "$29.99"}
                    </div>
                    <div className="text-gray-500">
                      {isMonthly ? "/ month" : "/ year"}
                    </div>
                  </div>
                  <p className="mb-8 mt-8 text-left leading-loose text-gray-500 2xl:mb-12">
                    Unlock more features and elevate your data analysis.
                  </p>
                  <ul className="mb-14 text-white">
                    {Object.keys(pricingData["premium"]).map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        {pricingData["premium"][text] ? (
                          <CheckArrowIcon />
                        ) : (
                          <XIcon />
                        )}
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="custom-button-colored mt-20 w-full justify-center rounded-xl rounded-t-xl px-4 py-2 font-bold leading-loose">
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="rounded-3xl bg-customDarkBg3 p-8">
                  <h4 className="font-heading mb-2 text-left text-xl font-bold text-white">
                    Premium + AI
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
                      {isMonthly ? "$3.99" : "$39.99"}
                    </div>
                    <div className="text-gray-500">
                      {isMonthly ? "/ month" : "/ year"}
                    </div>
                  </div>
                  <p className="mb-6 mt-4 text-left leading-loose text-gray-500 2xl:mb-10">
                    Experience the full power of our analytic platform
                  </p>
                  <ul className="mb-2 text-white 2xl:mb-6">
                    {Object.keys(pricingData["premiumAI"]).map(
                      (text, index) => (
                        <li className="mb-4 flex" key={`${text}-${index}`}>
                          {pricingData["premiumAI"][text] ? (
                            <CheckArrowIcon />
                          ) : (
                            <XIcon />
                          )}
                          <span>{text}</span>
                        </li>
                      ),
                    )}
                  </ul>
                  <Button className="mt-16 w-full justify-center rounded-xl rounded-t-xl bg-customDarkBg1 px-4 py-2 font-bold leading-loose">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
