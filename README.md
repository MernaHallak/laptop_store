# Laptop Store Aggregator — Frontend

## Overview

This repository contains the frontend for a multi-vendor laptop marketplace platform. Customers can browse multiple laptop shops in one place, each shop has a dedicated storefront with a consistent UI template, vendors manage their inventory through a private portal, and an admin dashboard is used to control the platform. Customers can contact a shop directly via the shop’s WhatsApp number.

## Features / Modules

### 1) Customer App (Marketplace)

* Shops listing: displays all registered shops. 
* Shop storefront: a reusable, consistent layout across all shops (same UI structure, different data).

* Search: search within a shop catalog (and optionally across all shops).
* Filters: filter products by common laptop attributes (e.g., brand, CPU, RAM, storage, GPU, screen size, condition, price range).
* Product details: full product page with specs, images, options/variants, and pricing.
* WhatsApp contact:

  * From a product page: opens WhatsApp with a prefilled message including product information (name/model/ID and optionally the product link).
  * From a shop page: opens WhatsApp with a general inquiry message (for customers who didn’t pick a specific product yet).

### 2) Vendor Portal (Shop Dashboard)

* Shop-only access: each shop manages only its own data.
* Product management: add, edit, delete laptops and parts/accessories.
* Hide/Unhide products: temporarily remove products from the customer view without deleting them (useful for out-of-stock items).
* Pricing management: update prices and manage discounts/promotions.
* Product details management: edit specs, options/variants, images, condition, warranty, and any metadata needed for search/filtering.


### 3) Admin Dashboard

* Global control over the platform: admin can manage all shops and content.
* Shop management: enable/disable shops, and edit shop profile (name, logo, WhatsApp number, etc.). 
* Vendor/user management : manage accounts, roles, and access. 
* Moderation: review, disable, or remove products and handle platform-wide settings.

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* zod (data validation for forms and inputs)
* clsx (conditional class name utility)
* Prettier + prettier-plugin-tailwindcss (consistent formatting and Tailwind class sorting)

## Setup (Local)

* Requirements: Node.js (LTS recommended) + npm
* Install dependencies: run npm install
* Start dev server: run npm run dev
* Production build: run npm run build
* Start production server: run npm run start
* Environment variables: create a local environment file and set the API base URL and any required keys (exact variables depend on your backend).


## Roadmap (Frontend)

* Finalize routing and page structure for the three modules (Customer, Vendor, Admin).
* Implement the shared shop storefront template (layout + reusable components).
* Build search and filtering UI components and connect them to API queries.
* Build product details page with full specs, images, and options/variants.
* Build vendor portal forms (create/edit product) with zod validation and good UX states (loading/error/success).
* Add hide/unhide product flow and clear status indicators in vendor portal.
* Build admin screens for shop management (list, edit, enable/disable).
* Improve UX: responsive design, accessibility basics, empty states, skeleton/loading states.
* Add optional enhancements: global search across shops, featured shops, and better sorting (price/spec-based).
