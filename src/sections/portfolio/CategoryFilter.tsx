// CategoryFilter component

const categories = ['All', 'Portrait', 'Wedding', 'Commercial', 'Editorial']

interface CategoryFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function CategoryFilter({ activeFilter, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-[72px] z-40 bg-dark border-b border-white/[0.08] px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex gap-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat.toLowerCase())}
            className={`accent-text whitespace-nowrap transition-all duration-300 relative pb-2 ${
              activeFilter === cat.toLowerCase()
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {cat}
            {activeFilter === cat.toLowerCase() && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
