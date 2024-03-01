import { m, LazyMotion, domAnimation } from "framer-motion";

const FeatureItem: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: true;
}> = ({ left, right, reverse }) => (
  <div className="maindiv flex flex-col justify-between gap-20 md:flex-row">
    <m.div
      initial={{ opacity: 0, transform: "translateX(-50px)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="flex flex-col justify-center gap-2"
    >
      {left}
    </m.div>
    <m.div
      initial={{ opacity: 0, transform: "translateX(50px)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className={`flex flex-col justify-center gap-2 ${
        reverse ? "order-last md:order-first" : ""
      }`}
    >
      {right}
    </m.div>
  </div>
);

export default FeatureItem;
