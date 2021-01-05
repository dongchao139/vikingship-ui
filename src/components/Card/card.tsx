import React from 'react';
import classnames from 'classnames';

export interface ICardProps {
  size: 'small' | 'middle' | 'large';
  avatar: string;
  description: string;
}

export const Card: React.FC<ICardProps> = ({
  size = 'large',
  avatar,
  description
}) => {
  const classes = classnames('bg-green-300', 'text-base', 'rounded-xl', 'overflow-auto', {
    'w-2/5': size === 'large',
    'w-1/3': size === 'middle',
    'w-1/4': size === 'small'
  })
  return (
    <div className={classes}>
      <img className="w-3/5 mx-auto my-6 rounded-full" src={avatar}/>
      <p className="leading-normal m-6">
        {description}
      </p>
    </div>
  )
}