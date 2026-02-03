"use client"

import { useState } from "react"
import AddStampModal from "@/components/add-stamp-modal"
import StampCard from "@/components/stamp-card"

interface Country {
  name: string
  code: string
}

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

interface UserPassport {
  country: Country | null
  photoUrl: string | null
  stamps: Stamp[]
}

interface PassportPageProps {
  passport: UserPassport
  onAddStamp: (stamp: Stamp) => void
  onBack: () => void
}

export default function PassportPage({ passport, onAddStamp, onBack }: PassportPageProps) {
  const [showAddStampModal, setShowAddStampModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const stampsPerPage = 4
  const totalPages = Math.ceil(passport.stamps.length / stampsPerPage)
  const startIndex = currentPage * stampsPerPage
  const currentStamps = passport.stamps.slice(startIndex, startIndex + stampsPerPage)

  const handleAddStamp = (stampData: Stamp) => {
    onAddStamp(stampData)
    setShowAddStampModal(false)
  }

  return (
    <div className="passport-page">
      <button onClick={onBack} className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      <div className="passport-header">
        <h2>PASSPORT</h2>
        <p>{passport.country?.name}</p>
        {passport.photoUrl && (
          <img src={passport.photoUrl} alt="Passport owner" className="passport-photo" />
        )}
      </div>

      <div className="stamps-display">
        <h3>Your Stamps ({passport.stamps.length})</h3>

        {passport.stamps.length === 0 ? (
          <p className="no-stamps">No stamps yet. Start collecting!</p>
        ) : (
          <>
            <div className="stamps-grid">
              {currentStamps.map((stamp, index) => (
                <StampCard key={stamp.id || index} stamp={stamp} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "4px" }}
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Previous
                </button>
                <span>
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "4px" }}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <button onClick={() => setShowAddStampModal(true)} className="add-stamp-button">
        + Add Stamp
      </button>

      {showAddStampModal && (
        <AddStampModal onClose={() => setShowAddStampModal(false)} onAddStamp={handleAddStamp} />
      )}
    </div>
  )
}
