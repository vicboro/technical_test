import { useEffect, useState } from 'react';
import { TimeService } from '../../services/time.service';
import styles from './top.module.scss';
import { UpdatedTimeType } from '../../interfaces';

export function TopSide(props: UpdatedTimeType) {
  const [time, setTime] = useState<string>('00:00:00');
  let interval: NodeJS.Timeout;

  useEffect(() => {
    const data = props.updateData;

    if (!data) {
      //TODO: show error
      return;
    }

    interval = setInterval(() => {
      setTime(TimeService.difference(data));
    }, 1000);

    return () => clearInterval(interval);
  }, [props.updateData]);

  return (
    <div className={styles.top_block}>
      <p>Difference time: {time}</p>
    </div>
  );
}
