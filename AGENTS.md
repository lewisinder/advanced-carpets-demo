# Agent Instructions For Advanced Carpets

Use these instructions when working on the Advanced Carpets Astro site.

## Project Context

Advanced Carpets is a flooring, carpet cleaning, restoration, and property service business. Frontend work should feel grounded in carpets, flooring, cleaning equipment, installation craft, material texture, home improvement, trust, workmanship, service areas, before/after transformation, and local customer confidence.

Do not produce a generic SaaS, agency, or AI-template website. Avoid default-looking hero sections, purple gradients, overused centered layouts, excessive rounded cards, meaningless badges, fake metrics, emoji icons, and generic stock-style visuals.

## CTA And Copy Rules

- Do not use the wording `free quote`, `quote`, `quotes`, or `quoting` in public site copy, navigation, headings, buttons, forms, or service cards.
- Prefer wording that fits the customer action: `Request an estimate`, `Make an enquiry`, `Book a measure`, `Discuss pricing`, `Send job details`, or `Arrange an assessment`.
- Keep button labels action-led and specific.
- Keep copy plain, practical, local, and service-specific.

## Frontend Standards

- Follow the existing Astro framework, routing, styling, and component conventions.
- Reuse existing classes and site styles where sensible instead of creating one-off styling.
- Keep edits scoped to the requested work.
- Prefer reusable components when repetition is meaningful.
- Use stable responsive dimensions for fixed-format UI such as galleries, cards, nav, toolbars, icons, and buttons.
- Ensure text does not overflow or overlap at mobile and desktop sizes.
- Add accessible labels, alt text, semantic structure, visible focus states, and keyboard-friendly controls.
- Respect `prefers-reduced-motion`.

## Visual Standards

- Make the first viewport clearly communicate Advanced Carpets and the flooring/carpet service.
- Use visual assets where they help users inspect product, workmanship, texture, rooms, or transformations.
- Prefer Lucide icons through `@lucide/astro`. Do not use emoji as UI icons.
- Cards should be used for repeated items or framed tools, not as the default wrapper for every section.
- Avoid nested cards and decorative UI that does not encode real information.

## Collaboration

Other agents may be working in this folder. Before editing, check `git status` and avoid reverting or mixing unrelated changes.

When asked to publish, push the intended scoped change to `main`.
