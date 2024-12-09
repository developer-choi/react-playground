import {Body1, H1} from '@/components/element/typography';
import layoutStyles from '@/styles/layout.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

export interface ErrorPageTemplateProps {
  title: string;
  content: string;
}

// URL: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0
export default function ErrorPageTemplate({title, content}: ErrorPageTemplateProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={classNames(layoutStyles.pageContentMedium, styles.innerContainer)}>
        <H1>{title}</H1>
        <Body1>{content}</Body1>
      </div>
    </div>
  );
}
