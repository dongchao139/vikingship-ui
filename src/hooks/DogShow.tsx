import React from 'react'
import useURLLoader from './withLoader';

interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC = () => {
  const [data, loading] =
    useURLLoader<IShowResult>('https://dog.ceo/api/breeds/image/random', []);
  return (
    loading ? <h2>'dog image loading...'</h2> :
      <>
        <h2>Dog show: {data.status}</h2>
        <img src={data.message} alt='dog' />
      </>
  )
}
export default DogShow;