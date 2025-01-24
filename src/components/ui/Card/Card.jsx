import { memo } from 'react';
import './Card.scss'
import clsx from 'clsx';
const Card = ({url, alt, nameCard, price, className}) => {
    return (
        <div className={clsx('card', className)}>
            <div className="w-full flex items-center justify-center rounded-t-[0.6rem] card__img">
                <img src={url} alt={alt} className='w-full h-full aspect-[3/4] rounded-t-[0.6rem] object-cover' loading="lazy"/>
            </div>
            <h3 className="px-[1.6rem] py-[0.8rem] uppercase text-center text-md font-semibold leading-[2.4rem] h-[3.5em] content-center overflow-hidden text-ellipsis line-clamp-2 card__name">
                {nameCard}
            </h3>
            <span className="text-md text-center font-bold text-[#DB4444] py-[0.8rem]">{price}</span>
        </div>
    )
}

export default memo(Card);