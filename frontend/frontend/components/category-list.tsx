import { Card, CardContent } from "@/components/ui/card"
import {
  Film,
  Music,
  Gamepad,
  Utensils,
  Briefcase,
  Dumbbell,
  Palette,
  GraduationCapIcon as Graduation,
} from "lucide-react"
import Link from "next/link"

export default function CategoryList() {
  const categories = [
    { id: "1", name: "Movies", icon: Film, count: 1245 },
    { id: "2", name: "Music", icon: Music, count: 873 },
    { id: "3", name: "Gaming", icon: Gamepad, count: 1502 },
    { id: "4", name: "Food", icon: Utensils, count: 621 },
    { id: "5", name: "Business", icon: Briefcase, count: 428 },
    { id: "6", name: "Fitness", icon: Dumbbell, count: 752 },
    { id: "7", name: "Art", icon: Palette, count: 391 },
    { id: "8", name: "Education", icon: Graduation, count: 867 },
  ]

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md hover:bg-accent">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{category.count} videos</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
