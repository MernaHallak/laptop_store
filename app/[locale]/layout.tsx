import "../globals.css";
import type { Metadata } from "next";
import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";


export const metadata: Metadata = {
  title: "Responsive Marketplace Homepage",
};

const LOCALES = ["ar", "en"] as const; //قائمة ثابتة قيمها حرفيًا:["ar", "en"]

export function generateStaticParams() { //generateStaticParamsهي دالة خاصة بـ Next.js (App Router) بتقول لـ Next:“أنا عندي route ديناميكي اسمه [locale]، والقيم المسموحة إلو هي: ar و en… فاعتبر هالمسارات موجودة وولّدها.” وبالتالي Next بيقول:في صفحة لـ /arوفي صفحة لـ /en
  // ولفرضا بدي قيم ثابتة بال shopid فيني حط هي الدالة ومرر القيم وهو يولدا
  return LOCALES.map((locale) => ({ locale }));
}
// هي الدالة بترجع هيك بال url[
//   { locale: "ar" },
//   { locale: "en" }
// ]

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: (typeof LOCALES)[number] }>; //هذا يعني: “هات نوع أي عنصر داخل هالمصفوفة "ar" | "en"

}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

   const messages = await getMessages(); //getMessages() بيرجع الرسائل المحمّلة من i18n/request.ts لنفس اللغة المختارة وهي دالة async

  //  getMessages() / getTranslations() هدول server-only (بيشتغلوا بالـ Server Components والـ layouts والـ pages على السيرفر). يعني بيرجعوا الرسائل/الترجمات “وقت الرندر على السيرفر”.
  // لكن الـ Client Component ما بيقدر يستخدمن فهو بيستخدم useTranslations()فال NextIntlClientProvider بيخلي أي Client Component (مثل Navbar) يقدر يستخدم useTranslations().

// دور NextIntlClientProvider:هو بياخد الـ messages اللي جبتها على السيرفر (بـ getMessages())، وبيحطها Context للجزء اللي تحتو ({children}). يعني جبت الرسائل على السيرفر بـ getMessages() وبعدين مرّرتها كـ prop لـ NextIntlClientProvider.

// الـ Context بـ React هو “قناة/مخزن” بتخلي بيانات مشتركة توصل لأي كومبوننت تحتها بدون ما تمرّرها كـ props طبقة طبقة.
  return (
    <html lang={locale} dir={dir}>
      <body>
         <NextIntlClientProvider messages={messages}>
          
        {children}
        </NextIntlClientProvider>
        </body>
    </html>
  );
}

// يعني {children} = “الصفحة الحالية اللي عم تزورها”.
// locale معناها بالعربي: اللغة والمنطقة (أو “الإعدادات المحلية”).

// كيف بحدد لغة  {t("brand")}
// 1) اللغة بتتحدد من الـ URL هاي بتوصل لـ app/[locale]/layout.tsx كـ:params.locale

// 2) جلب الرسائل المناسبة للغة هاي بتصير من خلال getMessages() اللي بيرجع الرسائل المحمّلة من i18n/request.ts لنفس اللغة المختارة وهي دالة async

// 3) تمرير الرسائل لـ NextIntlClientProvider عشان تقدر تستخدمها بالـ Client Components (مثل Navbar) من خلال useTranslations()يلي  بياخد الرسائل من الـ Provider (Context), فبس حط {t("brand")} بترجملي البراند على حسب اللغة الواصلتو لل useTranslations()
// واذا كان سيرفر كمبونانت بستخدم getTranslations()



