---
slug: clinical-workflows
title: "Designing Clinical Workflows That Actually Work"
authors: [dr_smith]
tags: [features, healthcare, patient-experience]
image: /img/blog/hero-clinical-workflows.svg
---

Ask any physician what frustrates them most about their EHR, and the answer is nearly universal: the workflows. Systems designed by engineers who have never worked in a clinical setting force providers to navigate through endless screens, click redundant buttons, and document in ways that interrupt the natural flow of patient care. Ciyex takes a fundamentally different approach by designing workflows around the patient encounter, not around database tables.

<!-- truncate -->

## The Click Fatigue Crisis

A 2024 study published in the Annals of Internal Medicine found that primary care physicians spend an average of 16 minutes per encounter on EHR documentation, nearly equal to the 18 minutes spent in direct patient interaction. For a provider seeing 20 patients per day, that is over five hours of documentation work.

This is not just an efficiency problem. It is a patient safety problem and a burnout problem.

- **Physician burnout**: EHR-related documentation burden is cited as a leading contributor to physician burnout, which affects nearly half of all practicing physicians.
- **Medical errors**: When providers are rushed through documentation, critical information gets missed. Allergy entries are skipped, medication interactions are not reviewed, and follow-up orders are forgotten.
- **Patient dissatisfaction**: Patients notice when their provider spends more time looking at a screen than looking at them. The therapeutic relationship suffers.

> "I became a doctor to help patients, not to be a data entry clerk. But my EHR makes me feel like the latter every single day."

## How Ciyex Designs for Clinical Reality

Ciyex workflows are built around a simple principle: the software should follow the provider, not the other way around. Every workflow is designed by studying how clinicians actually work, then building technology that supports those patterns.

### The Encounter-Centered Model

In clinical practice, everything revolves around the patient encounter. A patient arrives, is checked in, has vitals taken, sees a provider, receives assessments and plans, and departs. The EHR should mirror this flow naturally.

Ciyex organizes each encounter into a configurable set of tabs that match the clinical workflow:

1. **Check-in**: Demographics verification, insurance capture, consent forms
2. **Vitals**: Structured vital sign entry with automatic BMI calculation and trend visualization
3. **Chief Complaint and HPI**: Template-driven history of present illness with smart text expansion
4. **Review of Systems**: Configurable system-by-system review with "all normal" shortcuts
5. **Examination**: Physical exam documentation with anatomical templates
6. **Assessment and Plan**: Problem-oriented documentation with ICD-10 search, order entry, and prescription management
7. **Billing**: Automatic code suggestion based on documentation, NCCI edit checking

Each tab is driven by the `tab_field_config` system, which means it can be customized per organization, per specialty, or even per provider without modifying application code.

### SOAP Notes That Flow Naturally

The Subjective, Objective, Assessment, Plan (SOAP) note format has been the standard for clinical documentation for decades because it mirrors clinical reasoning. Ciyex implements SOAP documentation in a way that reduces keystrokes while maintaining completeness.

**Subjective Section**

The subjective section captures the patient's reported symptoms and history. Ciyex provides:

- **Smart templates**: Condition-specific templates (e.g., "chest pain," "upper respiratory symptoms") pre-populate relevant questions.
- **Voice-to-text integration**: Providers can dictate notes using built-in speech recognition.
- **Copy forward**: For chronic condition follow-ups, the previous visit's subjective section can be pulled forward and updated rather than recreated from scratch.

**Objective Section**

The objective section records measurable findings. Ciyex streamlines this with:

- **Vitals auto-population**: Vital signs entered by nursing staff during intake automatically appear in the objective section.
- **Lab result integration**: Recent lab results relevant to the encounter are surfaced automatically based on the problem list.
- **Structured exam findings**: Anatomical diagrams allow click-based documentation of physical exam findings, generating narrative text automatically.

**Assessment Section**

The assessment section is where clinical reasoning is documented. Ciyex supports:

- **Problem list integration**: Active problems are displayed with one-click access to add new assessments.
- **ICD-10 search with clinical context**: Search by clinical term, not just code number. Typing "type 2 diabetes" immediately surfaces E11.x codes with specificity options.
- **Differential diagnosis support**: Providers can document differential diagnoses with associated reasoning.

**Plan Section**

The plan section captures treatment decisions. Ciyex integrates all ordering workflows directly:

- **Medication prescribing**: Search medications, check interactions against the patient's current medication list, and send e-prescriptions.
- **Lab and imaging orders**: Order directly from the plan section with results routed back to the encounter.
- **Referral generation**: Create referrals to specialists with clinical summary auto-populated.
- **Patient instructions**: Generate visit summaries in the patient's preferred language.

### Order Entry Without the Maze

One of the most frustrating aspects of traditional EHR systems is order entry. Placing a simple lab order can require navigating through multiple screens, selecting from unintuitive dropdown menus, and confirming through redundant dialog boxes.

Ciyex implements order entry as a unified search interface. Providers type what they want to order, and the system presents matching options across all order categories:

```
Search: "CBC with diff"

Results:
  [Lab] Complete Blood Count with Differential (85025)
  [Lab] CBC without Differential (85027)

Search: "amoxicillin 500"

Results:
  [Rx] Amoxicillin 500mg capsule - PO TID x 10 days
  [Rx] Amoxicillin 500mg tablet - PO TID x 7 days
  [Rx] Amoxicillin/Clavulanate 500/125mg - PO BID x 10 days
```

From the search results, a single click places the order. Default dosing protocols and frequencies are pre-configured based on clinical guidelines, reducing the number of fields a provider must fill in.

### Prescription Management

E-prescribing in Ciyex is designed for speed and safety:

- **Formulary checking**: Real-time verification against the patient's insurance formulary with therapeutic alternatives when a medication is not covered.
- **Drug interaction alerts**: Interaction checking against the patient's current medication list, with severity classification (critical, major, moderate) to reduce alert fatigue.
- **Refill management**: Patients can request refills through the patient portal, and providers can approve or modify with one click from their inbox.
- **Controlled substance tracking**: PDMP (Prescription Drug Monitoring Program) integration for states that require it.

## The Configurable Tab System

What makes Ciyex workflows fundamentally different from proprietary alternatives is the `tab_field_config` system. Every clinical form, every field, every dropdown option is defined in configuration rather than hardcoded.

This means:

- **Specialty-specific workflows**: A cardiology practice can add echocardiogram result fields that a family medicine practice does not need, without custom development.
- **Regulatory adaptation**: When reporting requirements change, fields can be added or modified through configuration rather than software updates.
- **Provider preferences**: Individual providers can customize their documentation templates within the organization's overall workflow framework.

```json
{
  "tabKey": "encounter-vitals",
  "label": "Vitals",
  "category": "Encounter",
  "fields": [
    {
      "key": "bloodPressureSystolic",
      "label": "Systolic BP",
      "type": "number",
      "unit": "mmHg",
      "validation": { "min": 60, "max": 300 },
      "fhirMapping": {
        "resourceType": "Observation",
        "code": "85354-9",
        "path": "component.where(code.coding.code='8480-6').valueQuantity.value"
      }
    }
  ]
}
```

This configuration-driven approach means that adding a new vital sign type, changing a field label, or modifying validation rules requires zero code changes. An administrator makes the change in the settings interface, and it takes effect immediately.

## Reducing Cognitive Load

Beyond individual feature design, Ciyex applies several principles to reduce the overall cognitive load on providers:

- **Contextual information display**: Only information relevant to the current task is shown. A provider documenting a diabetes follow-up sees glucose trends and A1C history prominently, while orthopedic imaging is de-emphasized.
- **Smart defaults**: Common clinical scenarios have pre-configured defaults. A well-child visit automatically loads age-appropriate screening questions.
- **Keyboard navigation**: Power users can navigate the entire encounter workflow using keyboard shortcuts, eliminating the constant reach for the mouse.
- **Batch signing**: At the end of a session, providers can review and sign all completed notes in sequence rather than interrupting clinical flow to sign after each encounter.

## The Result: More Time with Patients

When workflows are designed around clinical reality rather than software convenience, the impact is measurable. Early adopters of the Ciyex workflow model report:

- 30% reduction in documentation time per encounter
- Fewer after-hours documentation sessions ("pajama time")
- Higher patient satisfaction scores due to increased face-to-face interaction
- Reduced order entry errors from streamlined ordering interfaces

Clinical workflows are not just a feature category. They are the foundation of how providers experience their EHR every day. Getting them right is not optional. It is essential.

To learn more about configuring Ciyex workflows for your practice, visit our [Developer Guide](/blog/dev-guide) or explore the [API documentation](/blog/building-on-ciyex-api).
