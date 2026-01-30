import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'FHIR R4 Compliant',
    icon: '🔗',
    description: (
      <>
        Built on HL7 FHIR R4 standards for seamless healthcare data exchange. 
        Connect with any FHIR-compliant system, EHR, or health information exchange.
      </>
    ),
  },
  {
    title: 'HIPAA Secure',
    icon: '🔒',
    description: (
      <>
        Enterprise-grade security with encryption at rest and in transit, 
        audit logging, role-based access control, and full HIPAA compliance.
      </>
    ),
  },
  {
    title: 'Modern Architecture',
    icon: '⚡',
    description: (
      <>
        Cloud-native microservices architecture with Kubernetes deployment, 
        auto-scaling, and high availability for mission-critical healthcare operations.
      </>
    ),
  },
  {
    title: 'Patient Portal',
    icon: '👤',
    description: (
      <>
        Empower patients with secure access to their health records, 
        appointment scheduling, messaging, and prescription management.
      </>
    ),
  },
  {
    title: 'Clinical Workflows',
    icon: '📋',
    description: (
      <>
        Streamlined clinical workflows for patient intake, charting, 
        e-prescribing, lab orders, and billing integration.
      </>
    ),
  },
  {
    title: 'Open Source',
    icon: '💚',
    description: (
      <>
        AGPL-3.0 licensed with full source code access. Self-host on your 
        infrastructure or use our managed cloud service.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why Choose Ciyex EHR?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
