import React, { useState, useEffect, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import brain from '../Pages/brain';

export function StationSearch({ value, onChange, placeholder = "Select station...", label }) {
  const [open, setOpen] = useState(false);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchStations = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await brain.search_stations({ query });
      const data = await response.json();
      setStations(data.stations);
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchStations();
  }, [searchStations]);

  const selectedStation = stations.find((station) => station.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStation ? `${selectedStation.name} (${selectedStation.code})` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={label || "Search for stations..."}
            onChange={(event) => searchStations(event.target.value)}
          />
          <CommandEmpty>{loading ? "Loading..." : "No stations found."}</CommandEmpty>
          <CommandGroup>
            {stations.map((station) => (
              <CommandItem
                key={station.code}
                onSelect={() => {
                  onChange(station.code);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${value === station.code ? "opacity-100" : "opacity-0"}`}
                />
                {station.name} ({station.code})
                <span className="ml-2 text-sm text-gray-500">
                  {station.state}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
