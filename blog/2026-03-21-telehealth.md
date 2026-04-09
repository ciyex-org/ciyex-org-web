---
slug: telehealth-integration
title: "Telehealth in Ciyex: Bringing Care to Every Community"
authors: [dr_smith]
tags: [telehealth, features, healthcare]
image: /img/blog/hero-telehealth.svg
---

For the 60 million Americans living in rural areas, seeing a specialist can mean a four-hour drive each way. For elderly patients with mobility limitations, for parents juggling work and childcare, for immunocompromised patients who should avoid waiting rooms, the barrier to care is often not clinical but logistical. Telehealth removes that barrier. Ciyex integrates telehealth directly into the clinical workflow, powered by Jitsi, so that virtual visits are as natural and well-documented as in-person encounters.

<!-- truncate -->

## Why Telehealth Belongs Inside the EHR

Most telehealth solutions today exist as standalone applications. A provider uses Zoom or Doxy.me for the video call, then switches to their EHR to document the visit. This creates several problems:

- **Context switching** breaks clinical concentration and increases documentation time
- **Separate logins and platforms** create friction for patients who are already stressed about their health
- **No automatic linkage** between the video session and the clinical encounter, making audit trails fragmented
- **Duplicate scheduling** requires maintaining availability in two systems

Ciyex solves this by embedding telehealth into the encounter workflow. When a provider starts a telehealth visit, the video window opens alongside the patient's chart. The encounter is automatically created and linked to the video session. Documentation happens in real time, in the same interface, with the same clinical tools available for in-person visits.

## Jitsi: Open Source Video for Healthcare

Ciyex uses **Jitsi** as its video conferencing engine. Jitsi is an open source, WebRTC-based video platform that provides:

**End-to-end encryption (E2EE).** Video and audio streams are encrypted from the patient's browser to the provider's browser. The Jitsi server relays encrypted packets without the ability to decrypt them. This means that even if the video infrastructure is compromised, the content of the clinical conversation remains private.

**No downloads required.** Patients join via a web link in any modern browser. There is no app to install, no account to create, and no software to update. This is critical for patients who are not technically savvy or who are accessing care from a shared device.

**Self-hostable.** Because Jitsi is open source, organizations can run their own video infrastructure on-premises or in their own cloud environment. For organizations with strict data residency requirements (e.g., Veterans Affairs, tribal health organizations), this eliminates the concern of video data passing through third-party servers.

**Scalable.** Jitsi supports Oercade-based scalable architectures with multiple video bridges, allowing a single deployment to handle hundreds of simultaneous video sessions.

## The Patient Experience

A telehealth visit in Ciyex is designed to be simple for patients:

1. **Appointment confirmation.** When a telehealth appointment is scheduled, the patient receives a confirmation with the date, time, and provider name.
2. **SMS notification.** Fifteen minutes before the visit, the patient receives an SMS with a secure link. No login is required to join the video room.
3. **Waiting room.** The patient enters a virtual waiting room. The provider sees a notification that the patient is ready.
4. **Video visit.** The provider admits the patient, and the video call begins. Screen sharing is available for reviewing lab results, imaging, or educational materials together.
5. **Post-visit summary.** After the visit, the patient can access their visit summary, any new prescriptions, and follow-up instructions through the patient portal.

The entire flow requires nothing from the patient except a device with a camera and an internet connection.

## Side-by-Side Charting

The most significant advantage of integrated telehealth is **simultaneous documentation**. The Ciyex interface displays the video feed alongside the encounter documentation area. Providers can:

- **Review the patient's history** while maintaining eye contact (the chart is adjacent to the video, not behind it)
- **Record vital signs** reported by the patient (home blood pressure readings, weight, temperature)
- **Update the problem list** and medication list in real time during the conversation
- **Write SOAP notes** as the visit progresses, rather than reconstructing the visit from memory afterward
- **Place orders** for labs, imaging, or referrals before the visit ends, so the patient leaves with clear next steps

This reduces the post-visit documentation burden that contributes to provider burnout. Studies show that physicians spend an average of 16 minutes per encounter on documentation. Side-by-side charting during telehealth visits can cut that time significantly.

## SMART on FHIR Launch Integration

Ciyex telehealth is launched using the **SMART on FHIR** launch framework. When a provider clicks "Start Telehealth Visit," the system:

1. Creates or opens the encounter in the FHIR server
2. Generates a SMART launch token containing the patient context, encounter context, and user identity
3. Opens the telehealth module with full EHR context

This SMART-based approach means that the telehealth component is not a monolithic feature hardcoded into the EHR. It is a modular application that receives its context through standardized protocols. In the future, organizations could swap Jitsi for a different video platform without changing the EHR integration layer.

## Impact on Rural and Underserved Communities

The communities that benefit most from telehealth are often the same communities that Ciyex was built to serve:

**Rural primary care.** A family medicine practice in a small town can offer specialist consultations (dermatology, psychiatry, endocrinology) via telehealth partnerships, eliminating the need for patients to travel to urban centers. The referring provider can remain in the room (virtually or physically) to ensure continuity of care.

**Behavioral health.** Mental health services have proven especially effective via telehealth. Patients who might avoid an in-person therapy appointment due to stigma or transportation barriers are more likely to engage from the privacy of their own home.

**Chronic disease management.** Patients with diabetes, hypertension, or heart failure benefit from frequent check-ins. Telehealth makes it practical to schedule brief, focused visits (10 to 15 minutes) for medication adjustments and self-management coaching, rather than requiring a full in-person visit each time.

**Post-surgical follow-up.** Many post-operative check-ins involve visual inspection and a brief conversation. Telehealth allows patients to recover at home and still receive timely follow-up care.

## Security and Compliance

Telehealth visits involve the same PHI as in-person visits, and the security standards are identical:

- All video streams use **end-to-end encryption** via WebRTC with SRTP (Secure Real-time Transport Protocol)
- Session metadata (who joined, when, duration) is logged in the encounter audit trail
- Recordings, if enabled by the organization, are encrypted at rest and subject to the same retention policies as other clinical documents
- The Jitsi server enforces **room authentication**, preventing unauthorized parties from joining a clinical video session

Ciyex telehealth complies with the telehealth provisions established during the COVID-19 public health emergency and subsequently made permanent by CMS, including audio-only visit support for patients without video-capable devices.

## Looking Ahead

Telehealth is not a pandemic-era stopgap. It is a fundamental expansion of how healthcare can be delivered. As broadband access continues to improve in rural areas through federal infrastructure programs, the reach of telehealth will grow. Ciyex is positioned to be the platform that makes this capability freely available to every clinic, regardless of their budget.

In upcoming releases, we plan to add asynchronous telehealth (store-and-forward) for dermatology and ophthalmology consultations, group visit support for chronic disease education sessions, and integration with remote patient monitoring devices that can stream data directly into FHIR Observations during a telehealth visit.

Care should go where the patient is. Telehealth makes that possible.
