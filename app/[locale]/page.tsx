// قااااعدة :
// بــ Next (App Router) ملف page.tsx هو Route entry خاص، مو كمبونانت reusable؛ لذلك ما منستورد page.tsx داخل page.tsx ومنخلي إعادة الاستخدام بملفات Components عادية (UI/logic). حتى اذا بدي استدعيا بغير مكان ما استدعي الpage.tsx لان هي روت وليس كمبونانت عادي للاستدعاء فهون بستدعي كمبونانت اعادة الاستخدام الحاطتا بقلبا يلي ممكن تكون سيرفر او كلينت كمبونانت
// يعني اذا بدي استخدم هل الصفحة بشي مكان ما بستدعي ال page.tsx بل بستدعي الكمبونانت المستدعيتو بقلبا
// page.tsx = غلاف راوت + جلب داتا/تحويل/حماية مجرد Wrapper. Components = كل الـ UI والمنطق القابل لإعادة الاستخدام.
// الأفضل تخلي page.tsx Server Component قدر الإمكان (جلب داتا/redirect/notFound) ويستدعي جواته Client Components صغيرة للتفاعل، حتى يقلّ JS والهيدرشن ويصير الأداء أحسن.

import HomeClient from "./HomeClient";
import { getShopCategories, shops } from "@/lib/data";

export default function HomePage() {
  // هون جلب الداتا/التحضير صار على السيرفر (ما بيننزل JS للمتصفح بسبب هالسطر)
  const categories = getShopCategories();

  return <HomeClient shops={shops} categories={categories} />;
}
