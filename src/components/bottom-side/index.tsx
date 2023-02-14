import { useEffect, useState } from 'react';
import styles from './bottom.module.scss';
import { UpdatedMetricsType } from '../../interfaces';

export function BottomSide(props: UpdatedMetricsType) {
  const [metrics, setMetrics] = useState<string>('');

  useEffect(() => {
    const data = props.updateData;

    if (!data) {
      //TODO: show error
      return;
    }

    setMetrics(data);
  }, [props.updateData]);

  return <div className={styles.metrics_block}>{metrics}</div>;
}
