import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange, ...props }) => (
  <select
    {...props}
    onChange={e => {
      props.onChange?.(e);
      onValueChange?.(e.target.value);
    }}
  >
    {children}
  </select>
);

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectItem: React.FC<SelectItemProps> = (props) => <option {...props} />;