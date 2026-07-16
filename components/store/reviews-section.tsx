"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export interface ProductReview {
  id: string
  author: string
  comment: string
  rating: number
  photo?: string
  date?: string
}

interface ReviewsSectionProps {
  rating: number
  totalReviews: number
  reviews?: ProductReview[]
}

// Fallback (a PDP normalmente já injeta reviews de churrasco por produto).
const mockedReviews: ProductReview[] = [
  {
    id: "mock-1",
    author: "Carlos Mendes",
    comment:
      "Chegou bem embalado e o acabamento em inox é excelente, bem robusto. Usei no fim de semana e aprovadíssimo!",
    rating: 5,
    date: "Compra verificada",
  },
  {
    id: "mock-2",
    author: "André Oliveira",
    comment:
      "Material grosso e resistente, dá pra ver que é de qualidade. Entrega dentro do prazo. Recomendo demais.",
    rating: 5,
    date: "Compra verificada",
  },
  {
    id: "mock-3",
    author: "Juliana Prado",
    comment:
      "Comprei de presente pro meu pai e ele amou. Bonito pessoalmente e bem durável. Ótimo custo-benefício.",
    rating: 4,
    date: "Compra verificada",
  },
]

function getAuthorInitials(author: string) {
  return author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function getReviewDistribution(reviews: ProductReview[]) {
  return [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length
    const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0

    return { stars, count, percentage }
  })
}

function ReviewStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? "fill-[#b98a2e] text-[#b98a2e]"
              : "fill-[#e5e5e5] text-[#e5e5e5]"
          }
        />
      ))}
    </div>
  )
}

export function ReviewsSection({ rating, totalReviews, reviews }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const visibleReviews = reviews && reviews.length > 0 ? reviews : mockedReviews
  const displayRating =
    rating > 0
      ? rating
      : visibleReviews.reduce((total, review) => total + review.rating, 0) / visibleReviews.length
  const displayTotalReviews = totalReviews > 0 ? totalReviews : visibleReviews.length
  const starDistribution = getReviewDistribution(visibleReviews)

  return (
    <section id="avaliacoes" className="bg-[#ffffff] px-4 py-8 md:py-12 border-t border-[#f5f5f5] scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b98a2e]">
            Avaliacoes
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1a1a1a] md:text-3xl">
            O que os clientes dizem
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
          <div>
            {/* Average rating */}
            <div className="rounded-2xl border border-[#eee6d8] bg-[#fffaf0] p-5 text-center">
              <span className="text-4xl font-bold text-[#1a1a1a]">
                {displayRating > 0 ? displayRating.toFixed(1) : "0.0"}
              </span>
              <div className="mt-2 flex justify-center">
                <ReviewStars rating={displayRating} size={17} />
              </div>
              <span className="mt-2 block text-xs text-[#737373]">
                {displayTotalReviews} Avaliacoes
              </span>
            </div>

            {/* Star distribution bars */}
            <div className="mt-5 flex flex-col gap-2">
              {starDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="w-4 text-right text-xs text-[#737373]">{item.stars}</span>
                  <Star size={12} className="fill-[#b98a2e] text-[#b98a2e] shrink-0" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f5f5f5]">
                    <div
                      className="h-full rounded-full bg-[#b98a2e] transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-[#737373]">{item.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Write review button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-5 w-full rounded-lg border border-[#e5e5e5] py-3 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#f5f5f5]"
            >
              Escreva uma avaliação
            </button>

            {/* Review form */}
            {showForm && (
              <div className="mt-4 rounded-lg border border-[#e5e5e5] p-4">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} aria-label={`${i + 1} estrelas`}>
                      <Star
                        size={24}
                        className="cursor-pointer text-[#e5e5e5] transition-colors hover:fill-[#b98a2e] hover:text-[#b98a2e]"
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Conte sobre sua experiência com o produto..."
                  className="h-24 w-full resize-none rounded-lg border border-[#e5e5e5] bg-[#ffffff] p-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#737373]/50 focus:border-[#b98a2e] focus:ring-1 focus:ring-[#b98a2e]/30"
                />
                <button className="mt-3 w-full rounded-lg bg-[#1a1a1a] py-2.5 text-sm font-semibold text-[#ffffff] transition-all hover:bg-[#1a1a1a]/85">
                  Enviar avaliação
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-3">
            {visibleReviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-[#eeeeee] bg-[#ffffff] p-4 shadow-sm md:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0d9a8] text-sm font-bold text-[#5b4126] ring-2 ring-[#b98a2e]/30">
                    {getAuthorInitials(review.author)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#1a1a1a]">{review.author}</h3>
                        {review.date && (
                          <p className="text-xs font-medium text-[#737373]">{review.date}</p>
                        )}
                      </div>
                      <ReviewStars rating={review.rating} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#525252]">{review.comment}</p>
                    {review.photo && (
                      <img
                        src={review.photo}
                        alt={`Imagem enviada por ${review.author}`}
                        className="mt-3 h-28 w-28 rounded-xl border border-[#eeeeee] object-cover md:h-32 md:w-32"
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
