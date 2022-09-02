import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import { ConfigContext, ConfigProviderProps } from '../../ConfigProvider';

export type HolderRef = {
  addInstance?: (ins: any) => void;
  removeInstance?: (ins: any) => void;
  getConfigProviderProps: () => ConfigProviderProps;
  removeAll?: () => void;
};

const ContextHolderElement = forwardRef<HolderRef>((_props, ref) => {
  const [instances, setInstances] = useState([]);
  const configProviderProps = useContext(ConfigContext);

  function getConfigProviderProps() {
    return configProviderProps;
  }

  function addInstance(ins) {
    setInstances((originInstances) => [...originInstances, ins]);
  }

  function removeInstance(ins) {
    setInstances((originInstances) => originInstances.filter((originIns) => ins !== originIns));
  }

  function removeAll() {
    setInstances([]);
  }
  useImperativeHandle(ref, () => ({
    addInstance,
    removeInstance,
    getConfigProviderProps,
    removeAll,
  }));

  return <>{instances}</>;
});

export default ContextHolderElement;
