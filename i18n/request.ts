// اعدادات next-intl
import {getRequestConfig} from "next-intl/server";
import {notFound} from "next/navigation";

const LOCALES = ["ar", "en"] as const;

export default getRequestConfig(async ({requestLocale}) => { //requestLocale: بيعطيك اللغة من المسار (الـ segment [locale]).
  const locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default //messages: عم تعمل import لملف الترجمة المناسب
  };
});
// اربط next-intl بالـ Next عبر next.config.ts لأن Next.js لحاله ما بيعرف إن في “نظام ترجمة” ولا بيعرف من وين يجيب ملفات الرسائل 

// إذا استخدمت مكتبة مثل next-intl →مو يدوية لتحديد شو ينعرض على حسب اللغة تلقاىيا من ال messages/ar.json + en.json بعد ما تربط  الـ locale (من /ar و/en) وتحمل ملف الرسائل الموافق هالشي بصير ضمن ملف i18n/request.ts
// بتحط JSON بمجلد messages أيضًا:
// التحميل حسب locale بصير تلقائي/منظّم
// عندك useTranslations() / getTranslations()
// دعم أفضل للـ Server/Client components
// تنسيق تواريخ/أرقام عبر Intl بسهولة

// اذا كانت يدوية :يعني بكل ملف تعمل import للـ JSON وتختار نص حسب locale بنفسك:
// import ar from "@/messages/ar.json";
// import en from "@/messages/en.json";
// const t = (key) => (locale === "ar" ? ar[key] : en[key]);