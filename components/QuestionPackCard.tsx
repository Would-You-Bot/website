type QuestionProps = {
  title: string;
  description: string;
  totalQuestions: number;
  type: string;
  likes: number;
  isFeatured: boolean;
};

const QuestionPackCard = ({ title, description, totalQuestions, type, likes }: QuestionProps) => {
  return (
    <div className="questionpack bg-gradient-to-r rounded-2xl p-[5px] from-[#0598F6] to-[#F00505]">
      <div className="h-full p-5 bg-black">
        <h5 className="mb-2 text-2xl font-semibold text-white">{title}</h5>
        <p className="text-[#B4B4B4] mb-5">{description}</p>

        <div className="flex items-center">
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Questions</span>
            <h6 className="font-medium text-white">{totalQuestions}</h6>
          </div>
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Type</span>
            <h6 className="font-medium text-white">{type}</h6>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-5 md:space-x-6">
          <div className="md:w-1/2">
            <button className="w-full wy-button primary">{likes} Likes</button>
          </div>
          <div className="md:w-1/2">
            <button className="w-full wy-button secondary">Use Pack</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPackCard;
