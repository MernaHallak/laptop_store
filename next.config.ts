import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts"); //بدون الـ plugin:Next ما رح يعرف من وين ياخد إعدادات next-intl
export default withNextIntl(nextConfig);



