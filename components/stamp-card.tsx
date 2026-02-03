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

interface StampCardProps {
  stamp: Stamp
}

export default function StampCard({ stamp }: StampCardProps) {
  return (
    <div className="stamp-card">
      <div className="stamp-design">
        <div className="stamp-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <p className="stamp-location">{stamp.location.name}</p>
        <p className="stamp-country">{stamp.location.country}</p>
        <p className="stamp-date">{new Date(stamp.date).toLocaleDateString()}</p>
        <p className="stamp-type">{stamp.location.type}</p>
      </div>
    </div>
  )
}
