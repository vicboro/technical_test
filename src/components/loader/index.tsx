import { useEffect, useState } from 'react';
import { LoaderPropsType } from '../../interfaces';
import styles from './loader.module.scss';

export function Loader(props: LoaderPropsType) {
  const [isVisible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!props.visibility) {
      setTimeout(() => setVisible(false), 1000);
      return;
    }
    setVisible(props.visibility);
  }, [props.visibility]);
  return <div className={[styles.loader, isVisible && styles.loader_show].join(' ')}>Loading</div>;
}
