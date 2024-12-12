"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps<T extends { toString(): string }> {
    items: { value: T; label: string }[];
    selectedValue: T | null;
    onSelect: (value: T | null) => void;
    placeholder?: string;
}
  
export function Combobox<T extends { toString(): string }>({
    items,
    selectedValue,
    onSelect,
    placeholder = "Select an option...",
  }: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false);
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedValue
              ? items.find((item) => item.value === selectedValue)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-2 w-2 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    className="text-sm py-1 px-2"
                    key={item.value.toString()}
                    value={item.value.toString()}
                    onSelect={() => {
                      onSelect(item.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-2 w-2",
                        selectedValue === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
}
  
