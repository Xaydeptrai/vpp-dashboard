"use client";

import React from "react";
import { Combobox } from "./ui/combobox";

interface EnumComboboxProps<T extends Record<string, string | number>> {
  enumObject: T;
  selectedValue: T[keyof T] | null;
  onSelect: (value: T[keyof T] | null) => void;
  placeholder?: string;
}

export function EnumCombobox<T extends Record<string, string | number>>({
  enumObject,
  selectedValue,
  onSelect,
  placeholder = "Select an option...",
}: EnumComboboxProps<T>) {
  const enumOptions = Object.entries(enumObject)
    .filter(([, value]) => typeof value === "number")
    .map(([key, value]) => ({
      value: value as T[keyof T],
      label: key,
    }));

  return (
    <Combobox<T[keyof T]>
      items={enumOptions}
      selectedValue={selectedValue}
      onSelect={onSelect}
      placeholder={placeholder}
    />
  );
}
