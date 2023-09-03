"use client";

import classes from "./SizeInput.module.css";

interface SizeInputProps {
  onClick: (value: string) => void;
  label: string;
  selected?: boolean;
}

const SizeInput: React.FC<SizeInputProps> = ({ onClick, label, selected }) => {
  return (
    <div
      className={selected ? classes.selected : classes.unselected}
      onClick={() => onClick(label)}
    >
      <div className={classes.label}>{label}</div>
    </div>
  );
};
export default SizeInput;
