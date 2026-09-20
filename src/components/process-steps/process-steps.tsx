import Reveal from '@webapp/components/reveal/reveal';
import SectionHeading from '@webapp/components/section-heading/section-heading';
import { processSteps } from '@webapp/data/site';
import styles from './process-steps.module.scss';

const ProcessSteps = () => (
  <section className={styles['section']} id="process">
    <div className={styles['inner']}>
      <SectionHeading
        align="center"
        eyebrow="How it works"
        lede="A predictable path from first phone call to final walkthrough — with the paperwork and pricing handled up front."
        title={
          <>
            Four steps, <span>zero guesswork</span>
          </>
        }
      />

      <ol className={styles['steps']}>
        {processSteps.map((step, index) => (
          <Reveal as="li" className={styles['step']} delay={index * 90} key={step.step}>
            <span className={styles['step-number']}>{step.step}</span>
            <h3 className={styles['step-title']}>{step.title}</h3>
            <p className={styles['step-text']}>{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
