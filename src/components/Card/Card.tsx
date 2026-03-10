import React from 'react'
import Image from 'next/image'

import Text from '../Text'

import styles from './Card.module.scss'

export type CardProps = {
  className?: string
  image: string
  captionSlot?: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  contentSlot?: React.ReactNode
  onClick?: React.MouseEventHandler
  actionSlot?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => (
  <div className={`${styles.card} ${className || ''}`} onClick={onClick}>
    <Image alt="card-image" className={styles.cardImage} height={286} src={image} width={394} />

    <div className={styles.cardContent}>
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text color="secondary" tag="p" view="p-14">
            {captionSlot}
          </Text>
        )}
        {title && (
          <Text className={styles.cardTitle} color="primary" data-testid="text" tag="p" view="p-20" weight="bold">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text className={styles.cardSubtitle} color="secondary" data-testid="text" tag="p" view="p-16">
            {subtitle}
          </Text>
        )}
      </div>
      <div className={styles.cardButton}>
        {contentSlot && (
          <Text color="primary" tag="p" view="p-18" weight="bold">
            {contentSlot}
          </Text>
        )}
        {actionSlot && <div>{actionSlot}</div>}
      </div>
    </div>
  </div>
)

export default Card
