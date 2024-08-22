import React from 'react'
// import { useGlobalContext } from '../Context';
import { FaStar } from 'react-icons/fa';

const Stars = ({filledStars}) => {
    // const { products } = useGlobalContext();
    const totalstars = 5;
    return (
        <div className='stars'>
            {Array.from({ length: totalstars }, (_, index) => (
                <FaStar
                    key={index}
                    color={index < filledStars ? '#FFD93D' : '#e4e5e9'}
                    size={20}
                />
            ))}
        </div>
    )
}

export default Stars
