import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src='/logo.svg'
      alt='Netflix'
      width={90}
      height={90}
      className='cursor-pointer'
    />
  );
};
