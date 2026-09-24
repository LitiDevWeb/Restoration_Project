import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaColumns, FaImage, FaTimes } from 'react-icons/fa';

import CtaLink from '@webapp/components/cta/cta-link';
import { stageLabels, type Project } from '@webapp/data/projects';
import { site } from '@webapp/data/site';
import BeforeAfter from './before-after';
import styles from './project-dialog.module.scss';

interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input[type="range"], [tabindex]:not([tabindex="-1"])';

const ProjectDialog = ({ project, onClose }: ProjectDialogProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [comparing, setComparing] = useState(false);

  const photos = project.photos;
  const current = photos[index];
  const before = photos.find((photo) => photo.stage === 'before');
  const after = [...photos].reverse().find((photo) => photo.stage === 'after') ?? photos[photos.length - 1];
  const canCompare = Boolean(before && after);

  const step = useCallback(
    (delta: number) => setIndex((value) => (value + delta + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, step]);

  return (
    <div className={styles['wrapper']}>
      <button aria-label="Close project details" className={styles['backdrop']} onClick={onClose} type="button" />

      <div
        aria-labelledby={`${project.id}-dialog-title`}
        aria-modal="true"
        className={styles['panel']}
        ref={panelRef}
        role="dialog"
      >
        <div className={styles['head']}>
          <div>
            <p className={styles['eyebrow']}>
              {project.category} · {project.location}
            </p>
            <h2 className={styles['title']} id={`${project.id}-dialog-title`}>
              {project.title}
            </h2>
          </div>
          <button
            aria-label="Close project details"
            className={styles['close']}
            onClick={onClose}
            ref={closeRef}
            type="button"
          >
            <FaTimes aria-hidden="true" size={16} />
          </button>
        </div>

        <p className={styles['summary']}>{project.summary}</p>

        <ul className={styles['scope']}>
          {project.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {canCompare && before && after && (
          <div className={styles['toggle']}>
            <button
              aria-pressed={comparing}
              className={styles['toggle-button']}
              onClick={() => setComparing(true)}
              type="button"
            >
              <FaColumns aria-hidden="true" size={12} />
              Before &amp; after
            </button>
            <button
              aria-pressed={!comparing}
              className={styles['toggle-button']}
              onClick={() => setComparing(false)}
              type="button"
            >
              <FaImage aria-hidden="true" size={12} />
              Full photo set
            </button>
          </div>
        )}

        <div className={styles['viewer']}>
          {comparing && before && after ? (
            <BeforeAfter after={after} before={before} />
          ) : (
            <figure className={styles['frame']}>
              <Image
                alt={current.alt}
                className={styles['image']}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                src={current.src}
              />
              <figcaption className={styles['caption']}>
                <span className={styles[`stage-${current.stage}`]}>{stageLabels[current.stage]}</span>
                <span>{current.alt}</span>
              </figcaption>
            </figure>
          )}
        </div>

        {!comparing && (
          <div className={styles['strip-wrap']}>
            <div className={styles['strip']}>
              {photos.map((photo, photoIndex) => (
                <button
                  aria-label={`Show photo ${photoIndex + 1}: ${photo.alt}`}
                  aria-pressed={photoIndex === index}
                  className={styles['thumb']}
                  key={photo.src.src}
                  onClick={() => setIndex(photoIndex)}
                  type="button"
                >
                  <Image alt="" className={styles['thumb-image']} fill sizes="120px" src={photo.src} />
                  <span className={styles['thumb-stage']}>{stageLabels[photo.stage]}</span>
                </button>
              ))}
            </div>

            <div className={styles['nav']}>
              <button aria-label="Previous photo" className={styles['nav-button']} onClick={() => step(-1)} type="button">
                <FaArrowLeft aria-hidden="true" size={12} />
              </button>
              <span className={styles['counter']}>
                {index + 1} / {photos.length}
              </span>
              <button aria-label="Next photo" className={styles['nav-button']} onClick={() => step(1)} type="button">
                <FaArrowRight aria-hidden="true" size={12} />
              </button>
            </div>
          </div>
        )}

        <div className={styles['footer']}>
          <p>
            These photos were taken on Fennec Restoration job sites in the Phoenix Valley. Stage labels show where each
            photo falls in the build.
          </p>
          <CtaLink href={site.phoneHref} size="sm">
            Call for estimate
          </CtaLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectDialog;
