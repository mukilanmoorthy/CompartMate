import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { StationSearch } from "./StationSearch";

export function SearchForm() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);

  const handleSearch = () => {
    if (!source || !destination || !date) return;

    const params = new URLSearchParams({
      source,
      destination,
      date: format(date, "yyyy-MM-dd"),
    });

    navigate(`/SearchResults?${params}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <StationSearch
            value={source}
            onChange={setSource}
            placeholder="Select source station"
            label="Search source station"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <StationSearch
            value={destination}
            onChange={setDestination}
            placeholder="Select destination station"
            label="Search destination station"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2 space-y-2">
          <label className="text-sm font-medium">Date of Journey</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="w-full md:w-auto px-8"
          onClick={handleSearch}
          disabled={!source || !destination || !date}
        >
          Search Trains
        </Button>
      </div>
    </div>
  );
}
