import React from 'react';

// A simplified implementation of Zustand's create function
export function create(createState) {
  let state;
  const listeners = new Set();

  // setState updates the state and notifies all subscribers
  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = replace ? nextState : { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    // Return an unsubscribe function
    return () => listeners.delete(listener);
  };

  // Initialize state using the provided function
  state = createState(setState, getState);

  // This is the hook that components will use to access the store
  function useStore(selector = getState, equalityFn = (a, b) => a === b) {
    // Get the selected piece of state
    const [selectedState, setSelectedState] = React.useState(() => selector(state));

    React.useEffect(() => {
      const checkForUpdates = () => {
        const newSelectedState = selector(state);
        // Only update if the selected state has changed
        if (!equalityFn(selectedState, newSelectedState)) {
          setSelectedState(newSelectedState);
        }
      };
      const unsubscribe = subscribe(checkForUpdates);
      return unsubscribe;
    }, [selector, equalityFn, selectedState]);

    return selectedState;
  }

  // Attach API methods to the hook so that it can be used imperatively
  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}
