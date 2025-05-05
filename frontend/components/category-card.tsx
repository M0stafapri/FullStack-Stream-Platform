import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    icon: LucideIcon
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon

  return (
    <Link key={category.id} href={`/category/${category.id}`} className="group">
      <div className="relative aspect-video rounded-md overflow-hidden bg-gradient-to-br from-red-500/20 to-purple-500/20 video-card-hover border border-white/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-8 w-8 text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium text-center group-hover:text-red-500 transition-colors">
        {category.name}
      </h3>
    </Link>
  )
}
