"use client"

import { useState } from "react"

const locations = [
  { name: "Paris", country: "France", type: "airport" },
  { name: "Barcelona", country: "Spain", type: "port" },
  { name: "Rome", country: "Italy", type: "airport" },
  { name: "Berlin", country: "Germany", type: "border" },
  { name: "Tokyo", country: "Japan", type: "airport" },
  { name: "New York", country: "United States", type: "airport" },
  { name: "Cancun", country: "Mexico", type: "airport" },
  { name: "London", country: "United Kingdom", type: "airport" },
]

interface Location {
  name: string
  country: string
  type: string
}

interface Stamp {
  location: Location
  date: string
  id: number
}

interface AddStampModalProps {
  onClose: () => void
  onAddStamp: (stamp: Stamp) => void
}

export default function AddStampModal({ onClose, onAddStamp }: AddStampModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedDate, setSelectedDate] = useState("")

  const handleSubmit = () => {
    if (selectedLocation && selectedDate) {
      const stamp: Stamp = {
        location: selectedLocation,
        date: selectedDate,
        id: Date.now(),
      }
      onAddStamp(stamp)
    } else {
      alert("Please select a location and date")
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Stamp</h2>

        <div className="modal-section">
          <label htmlFor="location-select">Location:</label>
          <select
            id="location-select"
            value={selectedLocation ? selectedLocation.name : ""}
            onChange={(e) => {
              const location = locations.find((l) => l.name === e.target.value)
              setSelectedLocation(location || null)
            }}
            className="modal-select"
          >
            <option value="">-- Choose Location --</option>
            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name} ({location.type}) - {location.country}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-section">
          <label htmlFor="date-input">Date:</label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-buttons">
          <button onClick={onClose} className="modal-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="modal-submit">
            Add Stamp
          </button>
        </div>
      </div>
    </div>
  )
}
