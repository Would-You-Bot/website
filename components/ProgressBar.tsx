import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ProgressBar = ({ currentPage, totalPages }: {
    currentPage: number,
    totalPages: number
}) => {
  const controls = useAnimation();
  const [percentFilled, setPercentFilled] = useState(0);

  useEffect(() => {
    const calculatePercentFilled = (current: number, total: number) => ((current + 1) / total) * 100;
    const newPercentFilled = calculatePercentFilled(currentPage, totalPages);

    setPercentFilled(newPercentFilled);

    controls.start({
      width: `${newPercentFilled}%`,
      transition: { duration: 0.5, type: "tween" },
    });
  }, [currentPage, totalPages, controls]);

  return (
    <div className="w-3/4 mx-auto">
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          style={{ width: `${percentFilled}%` }} 
          animate={controls}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
