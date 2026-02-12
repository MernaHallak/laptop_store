"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NavbarSearch() {
  const tCommon = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // هل الجهاز يدعم hover فعلي (ديسكتوب)؟
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // افتح على hover بالديسكتوب فقط
  const onEnter = () => {
    if (!canHover) return;
    setOpen(true);
    // فوكس سريع حتى تكتب فوراً (إذا فوت المستخدم على الانبوت)
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  // إذا شال الهوفر بدون ما يفوت على الانبوت -> يتسكر
  // إذا كان فوكس على الانبوت (يعني فات عليه) -> ما يتسكر
  const onLeave = () => {
    if (!canHover) return;

    // إذا المستخدم دخل على الانبوت (صار فوكس عليه)، لا تسكر
    if (document.activeElement === inputRef.current) return;

    // إذا ما دخل على الانبوت → سكر
    setOpen(false);
  };

  // بالموبايل: كبسة على الأيقونة تفتح/تسكر
  const onIconClick = () => {
    if (canHover) return; // بالديسكتوب ما بدنا click يخبص تجربة hover
    setOpen((v) => {
      const next = !v;
      if (next) requestAnimationFrame(() => inputRef.current?.focus());
      return next;
    });
  };

  return (
    <div className="relative flex items-center" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* Icon button */}
      <button
        type="button"
        onClick={onIconClick}
        className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>

      {/* Expanding input (UI فقط حالياً) */}
      <div
        className={[
          "ml-3 overflow-hidden transition-all duration-200 ease-out", // ml-3 = مسافة بين الأيقونة وحقل البحث
          open
            ? "max-w-[92vw] sm:max-w-[460px] lg:max-w-[360px] opacity-100"
            : "max-w-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex w-[92vw] sm:w-[460px] lg:w-[360px] items-center gap-2 rounded-md border bg-white px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={tCommon("searchProducts")}
            className="w-full text-sm outline-none"
            // حالياً UI فقط (لا بحث ولا نتائج)
            onChange={() => {}}
            value={""}
            readOnly
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // بالديسكتوب: لما تترك الحقل سكّر (والموبايل عنده زر X)
              if (canHover) setOpen(false);
            }}
          />

          {/* Close button (مفيد للموبايل) */}
          {!canHover && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-gray-50"
              aria-label="Close search"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
