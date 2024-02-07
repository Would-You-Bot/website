import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";

const CheckArrowIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="20px"
      height="20px"
      className="fill-customSecondary"
    >
      <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  </div>
);

const pricingData = [
  "Seamless integration",
  "Real-time data visualization",
  "Advanced predictive analytics",
  "Collaborative environment",
  "Responsive customer support",
];

export default function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleChange = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <section className="relative flex w-screen justify-center bg-customDarkBg2">
      <div className="absolute -top-16" id="pricing" />
      <div className="bg-customDarkBg2 pb-20 pt-12  md:w-4/5 lg:w-[1050px]  2xl:w-[1150px] ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="custom-block-subtitle">
                Find Your Perfect Fit
              </span>
              <h2 className="font-heading mb-6 mt-6 text-4xl font-bold text-white lg:text-5xl">
                Choose your best plan
              </h2>
              <p className="mb-6 text-customGrayText">
                Select the plan that suits your needs and benefit from our
                analytics tools.
              </p>
              <label className="group relative mx-auto flex h-12 w-44 cursor-pointer items-center justify-between rounded-lg bg-customDarkBg3 pl-1 pr-36 text-xl">
                <input
                  type="checkbox"
                  className="peer appearance-none"
                  checked={!isMonthly}
                  onChange={handleChange}
                />
                <span className="flex h-8 w-[5.5rem] cursor-pointer items-center bg-customDarkBg3 pr-2 duration-300 ease-in-out  after:h-10 after:w-[30rem]  after:rounded-lg   after:bg-customPrimary after:shadow-md after:duration-300 peer-checked:after:translate-x-[5.5rem]"></span>
                <div
                  className={`absolute flex text-sm font-bold text-white ${
                    isMonthly ? "ml-3 mr-9" : "ml-3 mr-9 text-gray-400"
                  }`}
                >
                  Monthly
                  <div className={isMonthly ? "text-gray-400" : undefined}>
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
                    {pricingData.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                <Button className="mt-16 w-full rounded-xl rounded-t-xl px-4 py-2 font-bold leading-loose bg-customDarkBg1" onClick={() => {window.open("/invite")}}>
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
                    {pricingData.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="custom-button-colored mt-20 w-full rounded-xl rounded-t-xl px-4 py-2 font-bold leading-loose">
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
                    {pricingData.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-16 w-full rounded-xl rounded-t-xl px-4 py-2 font-bold leading-loose bg-customDarkBg1">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
