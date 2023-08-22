import { useState } from "react";
import { motion } from "framer-motion";

interface ToggleProps {
  onChange: (isOn: boolean) => void;
  isOn?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onChange, isOn = false }) => {
  const [on, set_on] = useState(isOn);
  const [isAnimating, setIsAnimating] = useState(false);

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };
  const handleToggle = () => {
    if (!isAnimating) {
      set_on(!on);
      onChange(on);
    }
  };

  return (
    <button
      className={`w-12 h-6 relative rounded-full p-1 ${
        on ? "bg-green-500" : "bg-gray-300"
      } focus:outline-none`}
      onClick={handleToggle}
    >
      <motion.div
        initial={false}
        animate={{ x: on ? '1.5rem' : '0rem' }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
        onAnimationComplete={onAnimationComplete}
        className={`w-4 h-4 rounded-full shadow-md bg-white`}
      />
    </button>
  );
};

export default Toggle;
