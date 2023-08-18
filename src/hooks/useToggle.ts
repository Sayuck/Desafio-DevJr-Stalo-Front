import { useCallback, useState } from "react";

interface ReturnType {
  /**
   * The current state of the toggle.
   */
  value: boolean;

  /**
   * Set the state of the toggle to a specific value.
   * @param {boolean} [value] - The value to set the toggle to.
   */
  setValue: (value: boolean) => void;

  /**
   * Sets the state of the toggle to true.
   */
  setTrue: () => void;

  /**
   * Sets the state of the toggle to false.
   */
  setFalse: () => void;

  /**
   * Changes the state of the toggle to the opposite of its current state.
   */
  toggle: () => void;
}

/**
 * A hook that provides a boolean toggle state.
 * @param defaultValue - The starting value of the toggle.
 * @returns {ReturnType} The current state of the toggle and functions to change it.
 */
export function useToggle(
  defaultValue?: boolean
): ReturnType {
  const [value, setValue] = useState(Boolean(defaultValue));

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
