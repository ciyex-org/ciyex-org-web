---
slug: introducing-ciyex
title: "Introducing Ciyex EHR: Open Source Healthcare for Everyone"
authors: [ciyex_team]
tags: [mission, open-source, healthcare]
image: /img/blog/hero-introducing-ciyex.svg
---

Healthcare software has failed the people who need it most. Not the large hospital systems with seven-figure IT budgets, but the 30 million Americans who receive care at community health centers, rural clinics, and safety-net practices that cannot afford modern electronic health records. Globally, the picture is far worse. Billions of people receive care documented on paper, in spreadsheets, or in fragmented systems that cannot share data with one another.

Ciyex was built to change that.

<!-- truncate -->

## The Problem We Set Out to Solve

The U.S. EHR market is dominated by a handful of vendors. Epic, Cerner (now Oracle Health), and athenahealth collectively serve the majority of hospitals and large practices. Their software is powerful, but their pricing reflects it. Licensing fees for a mid-size practice can easily exceed $500 per provider per month, with implementation costs reaching hundreds of thousands of dollars.

For a federally qualified health center (FQHC) serving uninsured patients, for a free clinic run by volunteer physicians, or for an NGO operating in sub-Saharan Africa, these costs are prohibitive. The result is predictable:

- **Paper charts** that get lost, damaged, or simply cannot be shared across care teams
- **Medication errors** from illegible handwriting or missing allergy information
- **Fragmented care** where a patient's records exist in five different systems that never talk to each other
- **Regulatory burden** that consumes clinician time with manual reporting instead of patient care

This is not a technology problem. The technology to build a world-class EHR exists today, and much of it is open source. The problem is that no one has assembled these components into a complete, production-ready system and made it freely available under a license that guarantees it stays free.

## Why We Built Ciyex as a Nonprofit

Ciyex is a **501(c)(3) nonprofit organization**. This is a deliberate structural choice, not a marketing label. It means:

1. **No shareholders to satisfy.** Every dollar of funding goes toward building better software, not generating returns for investors.
2. **No vendor lock-in by design.** Our AGPL-3.0 license guarantees that the source code remains open. If anyone modifies Ciyex and offers it as a service, they must share those modifications.
3. **No bait-and-switch.** We cannot be acquired by a private equity firm that raises prices and guts the product. The nonprofit structure prevents this.
4. **Grant eligibility.** As a 501(c)(3), we can receive grants from foundations, government agencies, and philanthropic organizations focused on healthcare access.

> "The best healthcare software in the world means nothing if the people who need it most cannot afford it."

We chose AGPL-3.0 specifically because it is the strongest copyleft license available. The GPL family ensures that derivative works remain open source. The "A" (Affero) clause extends this to network use: if someone runs a modified version of Ciyex as a hosted service, they must release their changes. This prevents the common pattern of companies taking open source projects, adding proprietary features, and selling them as closed-source products.

## What v0.1.0 Includes

Our initial release is not a prototype or a proof of concept. It is a functional EHR platform built on production-grade infrastructure:

**Clinical Features**
- Patient demographics and registration with FHIR R4-native data storage
- Encounter management with configurable visit types
- Vitals recording with flowsheet-style display (rows by vital type, columns by encounter date)
- Clinical notes with structured SOAP documentation
- Problem lists, medication lists, and allergy tracking
- Multi-provider scheduling with calendar views

**Infrastructure**
- HAPI FHIR R4 server with partitioned multi-tenancy for complete data isolation between organizations
- Keycloak-based identity management with OAuth2/OIDC, supporting both local credentials and external identity providers
- PostgreSQL 17 with Row-Level Security (RLS) enforcing tenant isolation at the database layer
- Role-based access control with SMART on FHIR scopes for granular, resource-level permissions
- Flyway-managed database migrations for safe, repeatable schema evolution

**Platform Capabilities**
- Multi-tenant architecture supporting unlimited organizations from a single deployment
- Configurable UI via a metadata-driven tab and field system (no code changes needed to add new clinical forms)
- Patient portal with self-service access to health records
- RESTful API with full FHIR R4 support for third-party integrations

## Who Ciyex Is For

We built Ciyex for the organizations that existing EHR vendors have underserved or ignored entirely:

- **Community health centers and FQHCs** that need ONC-certified EHR capabilities without enterprise pricing
- **Free and charitable clinics** operated by volunteers who cannot justify software subscriptions
- **Rural practices** in areas where broadband limitations require lightweight, efficient software
- **International NGOs** providing care in low-resource settings where commercial EHRs are impractical
- **Medical education programs** that need realistic clinical software for training without licensing restrictions
- **Health IT developers** who want to build specialized applications on top of a solid, standards-based platform

## Built on Standards, Not Proprietary APIs

Every clinical data element in Ciyex is stored as a FHIR R4 resource. This is not a bolt-on integration layer. Our HAPI FHIR server is the system of record. When a nurse records a blood pressure reading, it becomes a FHIR Observation with proper LOINC coding. When a provider documents a diagnosis, it becomes a FHIR Condition with ICD-10 and SNOMED CT references.

This matters because FHIR is the language that modern healthcare speaks. The 21st Century Cures Act and the ONC's information blocking rules require that patients can access their data through standardized APIs. By building on FHIR from day one, Ciyex does not need a translation layer. The data is already in the right format.

## Join Us

Ciyex is not the work of one team. It is an invitation to every developer, clinician, designer, and advocate who believes that healthcare technology should be a public good.

- Browse the code on [GitHub](https://github.com/ciyex-org/ciyex)
- Read the documentation at [docs.ciyex.org](https://docs.ciyex.org)
- Join the conversation in our community forums

Healthcare is too important to be locked behind paywalls. Let us build something better, together.
