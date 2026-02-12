"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {useParams, usePathname, useRouter , useSearchParams} from "next/navigation";
import GlobalSearch from "./NavbarSearch";

export function Navbar() {
  const params = useParams<{locale: "ar" | "en"}>();
  const locale = params?.locale ?? "ar"; //برامس اذا كانت موجودة خود قيمتا اما اذا كانت null أو undefined خذ "ar" كقيمة افتراضية هي الحركة للامان وبالنادر لتصير وما يوصلني البرامس
  const isRTL = locale === "ar";

  const t = useTranslations("Nav"); //إذا خزّنت دالة داخل متغيّر، المتغيّر بصير “بيأشّر على الدالة”، وبتقدر تناديها باسم المتغيّر.
//useTranslations("Nav") بيرجعلك دالة t():t("allProducts") ترجع النص من messages/ar.json أو messages/en.json
// useTranslations بياخد الرسائل من الـ Provider (Context) الجاي من ال layout
  const router = useRouter();
  const pathname = usePathname();
    const searchParams = useSearchParams();

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
       const query = searchParams.toString(); //searchParams بيجي كـ كائن لهيك بحولو لنص لاقدر ادمجو مع ال path الجديد
    router.replace(query ? `${newPath}?${query}` : newPath);  
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between h-16 "
        //   استخدمت flex-row-reverse لأن dir="rtl" لحاله ما بيقلب ترتيب flex children داخليًا dir بس بيقلب الصفحة بدون ما يقلب العناصر 
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded" aria-hidden />
            <span className="text-xl font-semibold">{t("brand")}</span>
          </div>
           <GlobalSearch   />
          <div className="flex items-center gap-4 text-sm ">
            {/* استخدمت flex-row-reverse لأن dir="rtl" لحاله ما بيقلب ترتيب flex children داخليًا dir بس بيقلب الصفحة بدون ما يقلب العناصر */}
            <Link href={`/${locale}/all-products`} className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 rounded-md border text-white bg-black hover:bg-gray-800 px-3 py-2 text-sm font-medium transition-colors">
                {t("allProducts")}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </span>
            </Link>

            <Link
              href={`/${locale}/about`}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {t("about")}
            </Link>

            <button
              onClick={switchLocale}
              className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {locale === "ar" ? t("switchToEnglish") : t("switchToArabic")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}