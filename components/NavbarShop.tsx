import Link from 'next/link'
import React from 'react'
import NavbarSearch from './NavbarSearch'
import { Shop } from '@/lib/types'
import { useTranslations } from 'next-intl'

export default function NavbarShop({locale, shop}: {locale: string, shop: Shop}) {
    const tShop= useTranslations("Shop");
    const tCommon= useTranslations("Common");
  return (
     <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="min-w-0">
                  <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black">
                     <span className={locale === "ar" ? "rotate-180 inline-block" : "inline-block"}>←</span>
                     {/* ملاحظة صغيرة: لازم inline-block لحتى الـ rotate يشتغل صح على الـ span. */}
                     {tCommon("backToShops")}
                  </Link>
                  <h1 className="text-2xl font-semibold text-neutral-900 truncate">{shop.name}</h1>
                  <p className="text-sm text-neutral-600 truncate">{tShop(`tagline.${shop.id}`)}</p>
                </div>
              </div>
              <NavbarSearch  />
            </div>
          </header>
  )
}
