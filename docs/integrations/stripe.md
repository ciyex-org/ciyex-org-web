# Stripe Integration

Complete guide to integrating Stripe for payment processing in Ciyex EHR.

## Overview

Stripe provides secure payment processing for patient billing. Ciyex EHR integrates Stripe for credit card payments, payment intents, and subscription management.

## Features

- 💳 **Credit Card Processing** - Accept major credit cards
- 🔒 **PCI Compliance** - Stripe handles PCI compliance
- 📱 **Mobile Payments** - Apple Pay, Google Pay support
- 🔄 **Recurring Payments** - Subscription and payment plans
- 📊 **Payment Analytics** - Track revenue and payments
- 🔔 **Webhooks** - Real-time payment notifications
- 💰 **Refunds** - Process refunds programmatically
- 🌍 **Multi-Currency** - Support multiple currencies

## Setup

### Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete account verification
3. Get API keys from Dashboard → Developers → API keys

### Configuration

**Backend**:
```yaml
# application.yml
stripe:
  api-key: ${STRIPE_SECRET_KEY}
  publishable-key: ${STRIPE_PUBLISHABLE_KEY}
  webhook-secret: ${STRIPE_WEBHOOK_SECRET}
  currency: usd
```

**Frontend**:
```typescript
// .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Backend Integration

### Dependencies

```gradle
// build.gradle
dependencies {
    implementation 'com.stripe:stripe-java:24.0.0'
}
```

### Configuration Class

```java
@Configuration
public class StripeConfig {
    
    @Value("${stripe.api-key}")
    private String apiKey;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = apiKey;
    }
}
```

### Payment Service

```java
@Service
@RequiredArgsConstructor
public class PaymentService {
    
    @Value("${stripe.currency}")
    private String currency;
    
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    
    public PaymentIntent createPaymentIntent(Long invoiceId, BigDecimal amount) {
        try {
            Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new NotFoundException("Invoice not found"));
            
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount.multiply(BigDecimal.valueOf(100)).longValue())
                .setCurrency(currency)
                .putMetadata("invoiceId", invoiceId.toString())
                .putMetadata("patientId", invoice.getPatientId().toString())
                .setDescription("Invoice #" + invoice.getInvoiceNumber())
                .build();
            
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            
            // Save payment record
            Payment payment = new Payment();
            payment.setInvoiceId(invoiceId);
            payment.setStripePaymentIntentId(paymentIntent.getId());
            payment.setAmount(amount);
            payment.setStatus(PaymentStatus.PENDING);
            paymentRepository.save(payment);
            
            return paymentIntent;
            
        } catch (StripeException e) {
            throw new PaymentException("Failed to create payment intent", e);
        }
    }
    
    public void confirmPayment(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            
            if ("succeeded".equals(paymentIntent.getStatus())) {
                Long invoiceId = Long.parseLong(
                    paymentIntent.getMetadata().get("invoiceId")
                );
                
                // Update payment
                Payment payment = paymentRepository
                    .findByStripePaymentIntentId(paymentIntentId)
                    .orElseThrow(() -> new NotFoundException("Payment not found"));
                
                payment.setStatus(PaymentStatus.COMPLETED);
                payment.setCompletedAt(LocalDateTime.now());
                paymentRepository.save(payment);
                
                // Update invoice
                updateInvoiceStatus(invoiceId);
            }
            
        } catch (StripeException e) {
            throw new PaymentException("Failed to confirm payment", e);
        }
    }
    
    public Refund createRefund(String paymentIntentId, BigDecimal amount) {
        try {
            RefundCreateParams params = RefundCreateParams.builder()
                .setPaymentIntent(paymentIntentId)
                .setAmount(amount.multiply(BigDecimal.valueOf(100)).longValue())
                .build();
            
            return Refund.create(params);
            
        } catch (StripeException e) {
            throw new PaymentException("Failed to create refund", e);
        }
    }
}
```

### Payment Controller

```java
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @PostMapping("/intent")
    public ResponseEntity<?> createPaymentIntent(
        @RequestBody PaymentIntentRequest request) {
        
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(
            request.getInvoiceId(),
            request.getAmount()
        );
        
        return ResponseEntity.ok(Map.of(
            "clientSecret", paymentIntent.getClientSecret(),
            "paymentIntentId", paymentIntent.getId()
        ));
    }
    
    @PostMapping("/refund")
    public ResponseEntity<?> createRefund(
        @RequestBody RefundRequest request) {
        
        Refund refund = paymentService.createRefund(
            request.getPaymentIntentId(),
            request.getAmount()
        );
        
        return ResponseEntity.ok(Map.of(
            "refundId", refund.getId(),
            "status", refund.getStatus()
        ));
    }
}
```

### Webhook Handler

```java
@RestController
@RequestMapping("/api/webhooks/stripe")
@RequiredArgsConstructor
public class StripeWebhookController {
    
    @Value("${stripe.webhook-secret}")
    private String webhookSecret;
    
    private final PaymentService paymentService;
    
    @PostMapping
    public ResponseEntity<?> handleWebhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String signature) {
        
        try {
            Event event = Webhook.constructEvent(
                payload, signature, webhookSecret
            );
            
            switch (event.getType()) {
                case "payment_intent.succeeded":
                    handlePaymentSuccess(event);
                    break;
                    
                case "payment_intent.payment_failed":
                    handlePaymentFailure(event);
                    break;
                    
                case "charge.refunded":
                    handleRefund(event);
                    break;
                    
                default:
                    log.info("Unhandled event type: {}", event.getType());
            }
            
            return ResponseEntity.ok().build();
            
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).build();
        }
    }
    
    private void handlePaymentSuccess(Event event) {
        PaymentIntent paymentIntent = (PaymentIntent) event.getData().getObject();
        paymentService.confirmPayment(paymentIntent.getId());
        
        // Send receipt email
        emailService.sendPaymentReceipt(paymentIntent);
    }
    
    private void handlePaymentFailure(Event event) {
        PaymentIntent paymentIntent = (PaymentIntent) event.getData().getObject();
        
        // Update payment status
        Payment payment = paymentRepository
            .findByStripePaymentIntentId(paymentIntent.getId())
            .orElseThrow();
        
        payment.setStatus(PaymentStatus.FAILED);
        payment.setErrorMessage(paymentIntent.getLastPaymentError().getMessage());
        paymentRepository.save(payment);
        
        // Notify patient
        emailService.sendPaymentFailedNotification(payment);
    }
    
    private void handleRefund(Event event) {
        Charge charge = (Charge) event.getData().getObject();
        
        // Record refund
        // Update invoice
    }
}
```

## Frontend Integration

### Install Stripe.js

```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js
```

### Payment Form Component

```typescript
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
  invoiceId: number;
  amount: number;
  onSuccess: () => void;
}

function CheckoutForm({ invoiceId, amount, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/payments/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ invoiceId, amount })
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Patient Name',
            email: 'patient@example.com'
          }
        }
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-lg p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#9e2146'
              }
            }
          }}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function PaymentPage({ invoiceId, amount }: PaymentFormProps) {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>
        <p>Your payment has been processed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm
          invoiceId={invoiceId}
          amount={amount}
          onSuccess={() => setSuccess(true)}
        />
      </Elements>
    </div>
  );
}
```

## Payment Methods

### Save Payment Method

```java
public PaymentMethod savePaymentMethod(String customerId, String paymentMethodId) {
    try {
        PaymentMethodAttachParams params = PaymentMethodAttachParams.builder()
            .setCustomer(customerId)
            .build();
        
        PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        return paymentMethod.attach(params);
        
    } catch (StripeException e) {
        throw new PaymentException("Failed to save payment method", e);
    }
}
```

### List Payment Methods

```java
public List<PaymentMethod> listPaymentMethods(String customerId) {
    try {
        PaymentMethodListParams params = PaymentMethodListParams.builder()
            .setCustomer(customerId)
            .setType(PaymentMethodListParams.Type.CARD)
            .build();
        
        return PaymentMethod.list(params).getData();
        
    } catch (StripeException e) {
        throw new PaymentException("Failed to list payment methods", e);
    }
}
```

## Subscriptions

### Create Subscription

```java
public Subscription createSubscription(String customerId, String priceId) {
    try {
        SubscriptionCreateParams params = SubscriptionCreateParams.builder()
            .setCustomer(customerId)
            .addItem(
                SubscriptionCreateParams.Item.builder()
                    .setPrice(priceId)
                    .build()
            )
            .build();
        
        return Subscription.create(params);
        
    } catch (StripeException e) {
        throw new PaymentException("Failed to create subscription", e);
    }
}
```

### Cancel Subscription

```java
public Subscription cancelSubscription(String subscriptionId) {
    try {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        return subscription.cancel();
        
    } catch (StripeException e) {
        throw new PaymentException("Failed to cancel subscription", e);
    }
}
```

## Testing

### Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 9995 | Declined (insufficient funds) |
| 4000 0000 0000 0002 | Declined (generic) |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

### Test Webhooks

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:8080/api/webhooks/stripe

# Trigger test event
stripe trigger payment_intent.succeeded
```

## Security

### PCI Compliance

- ✅ Never store card numbers
- ✅ Use Stripe.js for card collection
- ✅ Validate webhook signatures
- ✅ Use HTTPS only
- ✅ Implement rate limiting

### Webhook Security

```java
@Component
public class WebhookSecurityFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        
        if (request.getRequestURI().startsWith("/api/webhooks/stripe")) {
            String signature = request.getHeader("Stripe-Signature");
            
            if (signature == null) {
                response.setStatus(401);
                return;
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
```

## Best Practices

1. **Idempotency** - Use idempotency keys for retries
2. **Error Handling** - Handle all Stripe exceptions
3. **Webhooks** - Use webhooks for async events
4. **Testing** - Test with Stripe test mode
5. **Logging** - Log all payment events
6. **Monitoring** - Monitor payment success rates
7. **Refunds** - Implement refund policies

## Troubleshooting

### Payment Declined

**Issue**: Card declined

**Solutions**:
- Check card details are correct
- Verify sufficient funds
- Try different card
- Check Stripe dashboard for details

### Webhook Not Received

**Issue**: Webhook events not triggering

**Solutions**:
```bash
# Check webhook endpoint
curl -X POST http://localhost:8080/api/webhooks/stripe \
  -H "Stripe-Signature: test"

# Verify webhook secret
echo $STRIPE_WEBHOOK_SECRET

# Check Stripe dashboard logs
```

## Next Steps

- [Billing](../features/billing.md) - Billing features
- [Patient Portal](../features/patient-portal.md) - Patient payments
- [Security](../security/best-practices.md) - Payment security
- [Monitoring](../operations/monitoring.md) - Payment monitoring
