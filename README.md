# آزمایش اول مهندسی نرم‌افزار

## اعضای گروه

## معرفی پروژه

## تکنولوژی‌های مورد استفاده

## نحوه اجرای پروژه

## تقسیم کار

## Kanban Board

## استراتژی شاخه‌ها

## گزارش Commitها

## Merge Requestها

## Conflictها

### Conflict اول

### Conflict دوم

## محافظت از شاخه main

## GitHub Actions

## GitHub Pages

## پاسخ پرسش‌های آزمایش

## استفاده از هوش مصنوعی

### main

شاخه پایدار پروژه که نسخه قابل انتشار برنامه در آن قرار دارد.

### dev

شاخه اصلی توسعه که featureها ابتدا در آن ادغام می‌شوند.

### feature/*

برای توسعه قابلیت‌های مستقل نرم‌افزار استفاده شده است.

### ci/github-pages

برای راه‌اندازی GitHub Actions و استقرار پروژه استفاده شده است.

سؤال ۱: .git پوشه‌ای است که دیتابیس محلی Git شامل objectها، commitها، reference شاخه‌ها، تنظیمات repository، index و اطلاعات دیگر را نگهداری می‌کند. معمولاً با git init ایجاد می‌شود.

سؤال ۲: Atomic یعنی یک commit یا PR یک تغییر منطقی و مستقل را انجام دهد؛ مثلاً «اضافه کردن حذف Task»، نه همزمان حذف Task، تغییر UI، README و Dark Mode.

سؤال ۳:

fetch        دریافت تغییرات remote بدون ادغام
pull         fetch + ادغام تغییرات
merge        ترکیب تاریخچه دو branch
rebase       انتقال commitها روی base جدید
cherry-pick  اعمال یک commit مشخص روی branch فعلی

سوال ۴:

reset:
جابجا کردن HEAD و در حالت‌های مختلف تغییر index/working tree

revert:
ساخت commit جدید برای خنثی کردن یک commit قبلی

restore:
بازگرداندن محتوای فایل‌ها

switch:
تغییر branch یا ایجاد branch جدید

checkout:
دستور قدیمی چندمنظوره برای branch و فایل

سوال ۵:

Stage یا Index فضای میانی بین Working Directory و Commit است:

git add file.txt

فایل را وارد stage می‌کند.

stash تغییرات commit نشده را موقتاً کنار می‌گذارد:

git stash
git stash pop

سوال ۶:

Snapshot یعنی Git در هر commit یک تصویر منطقی از وضعیت فایل‌های پروژه را نگه می‌دارد، نه اینکه commit صرفاً «یک diff» باشد.

سوال ۷:

Local repository روی سیستم توسعه‌دهنده است؛ remote repository نسخه‌ای روی سرویس‌هایی مانند GitLab/GitHub است که همکاری و اشتراک repository را امکان‌پذیر می‌کند.
