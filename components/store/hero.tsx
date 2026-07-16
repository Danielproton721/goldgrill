import Link from "next/link"

const HERO_BANNER_IMAGE = "/images/banner-home-principal.png"

export function Hero() {
  return (
    <section className="bg-[#ffffff]">
      {/* O CTA "Montar meu presente" está na própria arte — o banner todo leva pros kits */}
      <Link href="/colecoes/kits-de-presente" className="mx-auto block w-full max-w-[1600px]">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Kits de churrasco para presente — até 80% OFF"
          className="block h-auto w-full object-cover"
        />
      </Link>
    </section>
  )
}
