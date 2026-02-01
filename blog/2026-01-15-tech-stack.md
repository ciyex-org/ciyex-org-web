---
slug: tech-stack-deep-dive
title: "Under the Hood: The Ciyex Tech Stack"
authors: [dev_lead]
tags: [engineering, architecture, spring-boot, nextjs]
---

Building a modern EHR requires a robust, scalable technology stack. Here is why we chose Spring Boot and Next.js.

<!-- truncate -->

## The Backend: Spring Boot 3.2
We chose Java 21 and Spring Boot for the backend for three reasons:
1.  **Stability**: Java is the backbone of enterprise software.
2.  **Ecosystem**: Spring Security provides banking-grade security out of the box.
3.  **Performance**: With Virtual Threads (Project Loom), Spring Boot 3.2 handles high concurrency with ease.

## The Frontend: Next.js 14
For the frontend, we needed speed and SEO.
*   **App Router**: React Server Components allow us to fetch data securely on the server.
*   **Typescript**: End-to-end type safety prevents runtime errors in critical clinical workflows.

## Infrastructure
We use **Kubernetes** for orchestration and **Terraform** for Infrastructure as Code. This ensures that Ciyex can be deployed reliably in any environment, from AWS to on-premise servers.
