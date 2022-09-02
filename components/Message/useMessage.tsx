import React, { createRef, ReactElement } from 'react';
import ContextHolderElement, { HolderRef } from '../_class/ContextHolder';
import Message, { MessageProps, addInstance } from '.';

const messageTypes = ['info', 'success', 'error', 'warning', 'loading', 'normal'];
const messageFunc: any = {};

function useMessage() {
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;

  function getConfigProviderProps() {
    return contextHolderRef.current.getConfigProviderProps();
  }

  function addNewMessage(props: MessageProps) {
    const { prefixCls, rtl } = getConfigProviderProps();
    let uuid = 0;

    function addHolderRefInstance(elem: ReactElement) {
      uuid += 1;
      const newElem = React.cloneElement(elem, { key: uuid, prefixCls, rtl });
      contextHolderRef.current.addInstance(newElem);
    }

    return addInstance({ ...props }, addHolderRefInstance);
  }

  messageTypes.forEach((type) => {
    messageFunc[type] = (config: MessageProps) => {
      return addNewMessage({
        ...config,
        type,
      });
    };
  });

  messageFunc.clear = () => {
    Message.clear();
  };

  return [messageFunc, holderEle];
}

export default useMessage;
