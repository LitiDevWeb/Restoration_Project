import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './reveal.module.scss';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in milliseconds, applied as a transition delay. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Fades and lifts its children into view once, the first time they intersect
 * the viewport. Degrades to "always visible" when IntersectionObserver is
 * unavailable or the visitor prefers reduced motion (handled in CSS).
 */
const Reveal = ({ children, delay = 0, className, as = 'div' }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={classNames(styles['reveal'], { [styles['visible']]: visible }, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
