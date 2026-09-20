import { useState } from 'react';
import classNames from 'classnames';

import SectionHeading from '@webapp/components/section-heading/section-heading';
import { faqs } from '@webapp/data/site';
import styles from './faq.module.scss';

interface FaqProps {
  withHeading?: boolean;
  limit?: number;
}

const Faq = ({ withHeading = true, limit }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = typeof limit === 'number' ? faqs.slice(0, limit) : faqs;

  return (
    <section className={styles['section']} id="faq">
      <div className={styles['inner']}>
        {withHeading && (
          <SectionHeading
            eyebrow="Questions"
            lede="The things homeowners ask us before signing anything. If your question is not here, call or text and we will answer it straight."
            title={
              <>
                Answers before you <span>commit</span>
              </>
            }
          />
        )}

        <ul className={styles['list']}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li className={styles['item']} key={item.question}>
                <h3 className={styles['question-wrap']}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className={styles['question']}
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true" className={styles['sign']} />
                  </button>
                </h3>
                <div
                  aria-labelledby={buttonId}
                  className={classNames(styles['answer'], { [styles['open']]: isOpen })}
                  id={panelId}
                  role="region"
                >
                  <div className={styles['answer-inner']}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
