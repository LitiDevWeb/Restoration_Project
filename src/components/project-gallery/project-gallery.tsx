import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { FaExpandArrowsAlt } from 'react-icons/fa';

import SectionHeading from '@webapp/components/section-heading/section-heading';
import type { Project, ProjectCategory } from '@webapp/data/projects';
import ProjectDialog from './project-dialog';
import styles from './project-gallery.module.scss';

type Filter = ProjectCategory | 'All';

/** The cover is one of the project photos, so reuse that photo's reviewed alt text. */
const coverAlt = (project: Project) =>
  project.photos.find((photo) => photo.src.src === project.cover.src)?.alt ?? `${project.title} project photo`;

interface ProjectGalleryProps {
  items: Project[];
  withHeading?: boolean;
  headingEyebrow?: string;
  headingTitle?: ReactNode;
  headingLede?: ReactNode;
  showFilters?: boolean;
  columns?: 2 | 3;
}

const ProjectGallery = ({
  items,
  withHeading = true,
  headingEyebrow = 'Recent work',
  headingTitle,
  headingLede,
  showFilters = true,
  columns = 3,
}: ProjectGalleryProps) => {
  const [filter, setFilter] = useState<Filter>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filters = useMemo<Filter[]>(
    () => ['All', ...Array.from(new Set(items.map((project) => project.category)))],
    [items]
  );

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((project) => project.category === filter)),
    [filter, items]
  );

  const closeDialog = () => {
    setOpenProject(null);
    triggerRef.current?.focus();
  };

  return (
    <section className={styles['section']} id="work">
      <div className={styles['inner']}>
        {withHeading && (
          <SectionHeading
            eyebrow={headingEyebrow}
            lede={headingLede}
            title={headingTitle ?? (
              <>
                Work you can walk through <span>photo by photo</span>
              </>
            )}
          />
        )}

        {showFilters && (
          <div aria-label="Filter projects by category" className={styles['filters']} role="group">
            {filters.map((item) => (
              <button
                aria-pressed={filter === item}
                className={styles['filter']}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <p aria-live="polite" className={styles['count']}>
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter === 'All' ? '' : ` in ${filter}`}
        </p>

        <ul
          className={classNames(styles['grid'], styles[`columns-${columns}`])}
        >
          {visible.map((project) => (
            <li className={styles['card']} key={project.id}>
              <button
                aria-haspopup="dialog"
                className={styles['card-button']}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenProject(project);
                }}
                type="button"
              >
                <span className={styles['frame']}>
                  <Image
                    alt={coverAlt(project)}
                    className={styles['cover']}
                    fill
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw"
                    src={project.cover}
                  />
                  <span className={styles['badge']}>{project.category}</span>
                  <span aria-hidden="true" className={styles['expand']}>
                    <FaExpandArrowsAlt size={13} />
                  </span>
                </span>
                <span className={styles['body']}>
                  <span className={styles['card-title']}>{project.title}</span>
                  <span className={styles['card-text']}>{project.summary}</span>
                  <span className={styles['meta']}>
                    {project.location} · {project.photos.length} photos ·{' '}
                    {project.photos.some((photo) => photo.stage === 'before') ? 'with before & after' : 'in progress'}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openProject && <ProjectDialog onClose={closeDialog} project={openProject} />}
    </section>
  );
};

export default ProjectGallery;
