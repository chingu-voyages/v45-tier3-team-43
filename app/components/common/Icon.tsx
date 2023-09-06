import Image from 'next/image';

interface IconProps {
  iconUrl: string;
  altText: string;
  width?: number;
}

const Icon: React.FC<IconProps> = ({ iconUrl, altText, width }) => {

  return (
    <Image 
      src={iconUrl} 
      alt={altText} 
      width={width || 40}
      height={40}
    />
  );
};

export default Icon;