import { useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@webapp/data/projects';
import styles from './before-after.module.scss';

interface BeforeAfterProps {
  before: Photo;
  after: Photo;
  sizes?: string;
}

/** Draggable before/after comparison. The range input is the accessible control. */
const BeforeAfter = ({ before, after, sizes = '(max-width: 1024px) 100vw, 60vw' }: BeforeAfterProps) => {
  const [position, setPosition] = useState(50);

  return (
    <div className={styles['compare']}>
      <Image alt={after.alt} className={styles['image']} fill sizes={sizes} src={after.src} />
      <div className={styles['clip']} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image alt={before.alt} className={styles['image']} fill sizes={sizes} src={before.src} />
      </div>

      <span aria-hidden="true" className={styles['divider']} style={{ left: `${position}%` }} />
      <span aria-hidden="true" className={styles['tag-before']}>
        Before
      </span>
      <span aria-hidden="true" className={styles['tag-after']}>
        After
      </span>

      <input
        aria-label="Slide to compare the before and after photos"
        aria-valuetext={`${position}% of the before photo visible`}
        className={styles['range']}
        max={100}
        min={0}
        onChange={(event) => setPosition(Number(event.target.value))}
        type="range"
        value={position}
      />
    </div>
  );
};

export default BeforeAfter;
