"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import PassportPage from "@/components/passport-page"

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

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "passport">("landing")
  const [userPassport, setUserPassport] = useState<UserPassport>({
    country: null,
    photoUrl: null,
    stamps: [],
  })

  const handleCountrySelect = (country: Country, photoUrl: string) => {
    setUserPassport({
      ...userPassport,
      country: country,
      photoUrl: photoUrl,
    })
    setCurrentPage("passport")
  }

  const handleAddStamp = (stamp: Stamp) => {
    setUserPassport({
      ...userPassport,
      stamps: [...userPassport.stamps, stamp],
    })
  }

  return (
    <main>
      {currentPage === "landing" ? (
        <LandingPage onCountrySelect={handleCountrySelect} />
      ) : (
        <PassportPage
          passport={userPassport}
          onAddStamp={handleAddStamp}
          onBack={() => setCurrentPage("landing")}
        />
      )}
    </main>
  )
}
