import React from 'react';
import { Star } from 'lucide-react';

interface FeedbackCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ name, location, text, rating, image }) => {
  return (
    <article
      className="bg-gray-800 bg-opacity-90 rounded-3xl p-8 shadow-2xl flex flex-col select-none transition-transform transform hover:scale-[1.03] hover:shadow-3xl duration-300 font-inter"
      role="group"
      aria-label={`Feedback from ${name} in ${location}`}
    >
      <header className="flex items-center space-x-4 mb-6">
        <img
          src={image}
          alt={`Photo of ${name}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
          draggable={false}
        />
        <div>
          <h3 className="text-white text-xl font-semibold">{name}</h3>
          <p className="text-green-400 text-sm">{location}</p>
        </div>
      </header>
      <div className="flex items-center space-x-1 mb-6" aria-label={`Rating: ${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={20} className="text-green-500 fill-current" aria-hidden="true" />
        ))}
        {rating < 5 &&
          Array.from({ length: 5 - rating }).map((_, i) => (
            <Star key={`empty-${i}`} size={20} className="text-gray-600" aria-hidden="true" />
          ))}
      </div>
      <p className="text-gray-300 text-lg italic leading-relaxed flex-grow">{`"${text}"`}</p>
    </article>
  );
};

export default FeedbackCard;