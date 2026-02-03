"use client"

import { useState } from "react"

const countries = [
  { name: "United States", code: "US" },
  { name: "France", code: "FR" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "Germany", code: "DE" },
  { name: "Japan", code: "JP" },
  { name: "Canada", code: "CA" },
  { name: "Mexico", code: "MX" },
]

interface Country {
  name: string
  code: string
}

interface LandingPageProps {
  onCountrySelect: (country: Country, photoUrl: string) => void
}

export default function LandingPage({ onCountrySelect }: LandingPageProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStart = () => {
    if (selectedCountry && photoUrl) {
      onCountrySelect(selectedCountry, photoUrl)
    } else {
      alert("Please select a country and upload a photo")
    }
  }

  return (
    <div className="landing-page">
      <h1>Passporty</h1>

      <div className="landing-container">
        <div className="photo-section">
          <div className="photo-circle">
            {photoUrl ? (
              <img src={photoUrl} alt="Passport" />
            ) : (
              <span className="camera-icon" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="photo-input"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="photo-label">
            Upload your passport photo
          </label>
        </div>

        <div className="country-section">
          <label htmlFor="country-select">Select your passport country:</label>
          <select
            id="country-select"
            value={selectedCountry ? selectedCountry.code : ""}
            onChange={(e) => {
              const country = countries.find((c) => c.code === e.target.value)
              setSelectedCountry(country || null)
            }}
            className="country-select"
          >
            <option value="">-- Choose Country --</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleStart} className="start-button">
          Start Collecting Stamps
        </button>
      </div>
    </div>
  )
}
