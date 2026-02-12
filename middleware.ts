// // شو هو ملف middleware.ts أصلاً؟
// // ‏هو ملف وسيط بتشغّله Next.js على السيرفر قبل ما يوصل الطلب لصفحاتك.
// //  middleware مفيد لأنه: بيشتغل قبل ما Next يحاول يحمّل صفحة
// //‏يعني أي طلب (request) بيجي على الموقع، الـ middleware بيقدر:
// // - يقرأ الـ URL
// // - يقرأ cookies / headers
// // - يقرر يعمل redirect أو rewrite أو يكمل عادي
// // ضيف middleware.ts ليحوّل / → /ar
// // شو بيعمل التحويل عمليًا؟
// // - المستخدم يكتب: example.com/
// // - السيرفر يشوفها بالـ middleware
// // - بيرجعله رد يقول: “روح على example.com/ar” عمل redirect

// //انا بكل رابط رح حط ببدايتوlocale لياخدني على اللغة المختارة لكن عملت الميدلوير يضل للحالات الخارجية (دخول مباشر بدون locale).

// import { NextResponse } from "next/server"; //أدوات لترد على الطلب (تكمل عادي، تعمل redirect، تعمل rewrite…).
// import type { NextRequest } from "next/server"; //نوع الطلب اللي جاي من المتصفح (فيه URL, headers, cookies…).
// const LOCALES = ["ar", "en"] as const;
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl; //req.nextUrl.pathname بيجيب “المسار” من الرابط فقط.
// // req.nextUrl =كائن URL جاهز  فيه أجزاء الرابط مفصولة وسهلة الاستخدام.بتقدر تاخد منه:pathname وsearchParams وorigin "يلي هي عبارة عن الرابط الاصلي بدون المسار"

// // اذا الرابط فيو /ar او /en 
// // some: هي دالة على المصفوفات تفحص عناصر المصفوفة واحد واحد تأكد إذا في “ولو عنصر واحد” مطابق (ترجع true/false).
//   const hasLocale = LOCALES.some(
//     (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
//   );
//   if (hasLocale) return NextResponse.next();
// // كمّل طبيعي وخلي Next يوصل للصفحة المطلوبة

//     // يبني رابط جديد: /ar + المسار الحالي، ويحافظ على الـ query
//     // ال query هي نفسا ال وsearchParams البتجي بعد اشارة الاستفهام
//   const nextPath = `/ar${pathname}${req.nextUrl.search}`;
//   return NextResponse.redirect(new URL(nextPath, req.url)); 
//   //req.url = الرابط الكامل كنص متل http://localhost:3000/shops/3?page=2&sort=price عنا البروتوكول هو http والدومين هو اسم الموقع او الدومين الفاتحة عليه localhost والبورت هو 3000 pathname = /shops/3 ,req.nextUrl.search | وsearchParams= ?page=2&sort=price
   
//     // new URL(nextPath, req.url)  بياخد الرابط الاصلي الكاملreq.url وببدل فيه الpathName +  query اذا كانت موجودة الى nextPath
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
// // هاي بتقول: “شغّل الميدلوير على كل المسارات إلا:” api → مسارات الـ API  و_next → ملفات Next الداخلية (JS/CSS) 
// //  .*\\..* → أي مسار فيه امتداد ملف مثل: /favicon.ico /images/logo.png /robots.txt
// ليش مهم نستثنيهم؟لأن تشغيل الميدلوير على هالأشياء ممكن يسبب مشاكل/بطء أو يخرب تحميل الملفات.


// انا فوق كنت عاملة Middleware يدوي بس هالشي ما بيتوافق مع requestLocale لأن requestLocale اللي استخدمناه بـ next-intl لجلب اللغة بيعتمد على middleware تبع next-intl
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en"], // اللغات المسموحة بالموقع (مسارات /ar و /en)
  defaultLocale: "ar", // اللغة الافتراضية إذا ما كان في لغة بالـ URL (حوّل تلقائيًا للعربي)
  localePrefix: "always", // لازم يكون الـ locale موجود دائمًا بالـ URL (/ar/... و /en/...)
    localeDetection: false
});

// بالـ next-intl افتراضيًا localeDetection شغّال فاذا ما عطلتا الرح يصير هو :

// لما تروح على رابط بدون /ar أو /en (مثل /shops/1/categories)
// الـ middleware ما بيقول “خلاص default = ar” مباشرة
// بل أول شي بيحاول يحدد اللغة من:
// كوكي (عادة NEXT_LOCALE) اللي بتنحفظ لما تبدّل اللغة
// أو Accept-Language من المتصفح يلي اخدا من لغة الويندوز الاساسية وعندي هي الانكليزي
// فاذا في كوكي بياخد لغتا واذا كان اول دخول للموقع بياخد اللغة من المتصفح فلهيك وقفت هال الشي ليصير ياخد اللغة الافتراضية الحاطتا بالميديلوير وانا بكل رابط بحدد اللغة المختارة 
// ولو سكرت الموقع ورجعت فتحتو فالكوكي بضل محفوظة الا اذا انا مسحتا او كان الها Session وتنحذف عند الإغلاق

// لي ما خلينا ال localeDetection  شغالة لحتى اذا في روابط ناقص فيا اللوكال اخدو من الكوكي او المتصفح :
// لان اول دخول رح تاخد من لغة المتصفح فعالم رح يشتغل عندا انكليزي وعالم عربيونحنا بدنا ياه عطول اول دخول عربي 
// ولان ممكن ما تنحفظ الكوكي لأي سبب وقتها بيرجع يعتمد على لغة المتصفح. ولو انا كنت مختارة غير لغة فالاضمن حط لوكال لكل رابط

// شرحا فوق 
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};

// الخلاصة “مين بيقرر ar/en بال url?
//‏في مستويين:

// 1) المسار نفسه (URL)

// إذا فيه /ar أو /en → هي اللغة المعتمدة. هي اللغة بتكون جاي من الزر الكبستو وحاطتو بالمسار عن طريق تبديل pathname تبع ال locale القديم ونحط محلو الجديد أو من رابط مباشر (مثلاً: example.com/ar/about) واول مرة بفوت عالموقع الميدلوير هو البحولني للعربي 

// 2) الميدلوير (عند غياب اللغة)

// إذا ما فيه locale → بيضيف defaultLocale (عندك عربي) ويعمل redirect.

//‏وبعدين next-intl يحمّل ملف الرسائل بناءً على هالـ locale.

