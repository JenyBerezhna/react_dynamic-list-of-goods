import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const reload = () => {
    setLoading(true);
    setErrorMessage('');
    getAll()
      .then(setGoods)
      .catch(() => setErrorMessage('Failed to load goods'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAll().then(setGoods);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getAll()
        .then(setGoods)
        .catch(() => setErrorMessage('Failed to load goods'))
        .finally(() => setLoading(false));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadAll = () => {
    getAll().then(setGoods);
  };

  const handleLoadFirstFive = () => {
    get5First().then(setGoods);
  };

  const handleLoadRedGoods = () => {
    getRedGoods().then(setGoods);
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={handleLoadAll}>
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={handleLoadFirstFive}
      >
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={handleLoadRedGoods}>
        Load red goods
      </button>

      {loading && <p>Loading...</p>}
      {errorMessage && (
        <div className="notification is-danger">
          <p>{errorMessage}</p>
          <button onClick={reload}>Reload</button>
        </div>
      )}

      <GoodsList goods={goods} />
    </div>
  );
};
