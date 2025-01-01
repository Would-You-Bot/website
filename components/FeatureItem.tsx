"use client";

import { motion } from "motion/react";

const FeatureItem: React.FC<{
	left: React.ReactNode;
	right: React.ReactNode;
	reverse?: true;
}> = ({ left, right, reverse }) => (
	<div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-20 rounded-md max-w-[300px] lg:max-w-8xl md:max-w-8xl sm:max-w-8xl">
		<motion.div
			initial={{ opacity: 0, transform: "translateX(-50px)" }}
			whileInView={{ opacity: 1, transform: "translateX(0)" }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: "easeInOut" }}
			className="mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2"
		>
			{left}
		</motion.div>
		<motion.div
			initial={{ opacity: 0, transform: "translateX(50px)" }}
			whileInView={{ opacity: 1, transform: "translateX(0)" }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: "easeInOut" }}
			className={`mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2 rounded-md ${
				reverse ? "order-last md:order-first" : ""
			}`}
		>
			{right}
		</motion.div>
	</div>
);

export default FeatureItem;
