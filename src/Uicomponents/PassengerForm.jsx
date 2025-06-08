import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PassengerForm({ passenger, seatInfo, onChange, onRemove, showRemoveButton }) {
  const handleChange = (field, value) => {
    onChange({
      ...passenger,
      [field]: value,
    });
  };

  const getPassengerType = (age) => {
    if (age < 12) return "CHILD";
    if (age >= 60) return "SENIOR";
    return "ADULT";
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">Passenger Details</h3>
          <div className="flex space-x-2">
            <Badge variant="outline">{seatInfo.coach_number}</Badge>
            <Badge variant="outline">Seat {seatInfo.seat_number}</Badge>
          </div>
        </div>
        {showRemoveButton && onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={passenger.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={1}
            max={120}
            value={passenger.age || ""}
            onChange={(e) => {
              const age = parseInt(e.target.value);
              handleChange("age", age);
              handleChange("type", getPassengerType(age));
            }}
            placeholder="Enter age"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={passenger.gender} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Male</SelectItem>
              <SelectItem value="F">Female</SelectItem>
              <SelectItem value="O">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Passenger Type</Label>
          <Input value={passenger.type} disabled className="bg-gray-50" />
        </div>
      </div>
    </Card>
  );
}
