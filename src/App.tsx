import React, { useEffect, useState } from 'react';
import './App.scss';
import { TopSide } from './components/top-side';
import { BottomSide } from './components/bottom-side';
import { Loader } from './components/loader';
import { Api } from './services/api.service';

function App() {
  const [epoch, setEpoch] = useState<number>(0);
  const [metrics, setMetrics] = useState<string>('');
  const [loader, showLoader] = useState<boolean>(true);

  const fetchData = () => {
    showLoader(true);

    Promise.all([Api.getTime(), Api.getMetrics()])
      .then(([time, metrics]) => {
        setEpoch(time);
        setMetrics(metrics);
      })
      .catch((err) => {
        console.log('Got some errors: ', err);
      })
      .finally(() => showLoader(false));
  };

  useEffect(() => {
    fetchData();

    const updateInterval = setInterval(() => {
      fetchData();
    }, 5 * 1000);

    return () => clearInterval(updateInterval);
  }, []);
  return (
    <div className="Layout">
      <Loader visibility={loader} />
      <TopSide updateData={epoch} />
      <BottomSide updateData={metrics} />
    </div>
  );
}

export default App;
