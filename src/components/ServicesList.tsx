'use client';

interface ServicesListProps {
  setService: (service: string) => void;
  item: { id: string; english: string; hindi: string } | any;
  service: string;
  language: boolean;
}

const ServicesList: React.FC<ServicesListProps> = ({ setService, item, service, language }) => {
  return (
    <button
      onClick={() => setService(item.english)}
      className={`rounded-full h-12 py-2 px-4 mx-1 my-3 min-w-fit  border-2 border-purple-600 font-medium ${
        item.english === service ? 'bg-purple-600 text-white' : 'bg-gray-100  text-purple-600'
      }`}
    >
      <span className="text-base">{language ? item.hindi : item.english}</span>
    </button>
  );
};

export default ServicesList;