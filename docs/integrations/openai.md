# Azure OpenAI Integration

Guide to configuring Azure OpenAI for AI-powered features in Ciyex EHR.

## Overview

Ciyex EHR leverages Large Language Models (LLMs) for:
- Clinical note summarization
- Smart search capabilities
- Drafting patient responses (provider review required)
- Voice-to-text transcription correction

## Prerequisites
- Azure Subscription
- Azure OpenAI resource created
- Models deployed (e.g., `gpt-4`, `gpt-35-turbo`, `text-embedding-ada-002`)

## Configuration

Configure `application.yml`:

```yaml
azure:
  openai:
    endpoint: https://your-resource-name.openai.azure.com/
    api-key: ${AZURE_OPENAI_API_KEY}
    deployment:
      chat: gpt-4-deployment
      embeddings: embedding-deployment
```

## Features

### Clinical Summarization
Automatically generates a summary of the patient's history or recent encounter notes.

```java
public String summarizeEncounter(String encounterText) {
    ChatCompletionsOptions options = new ChatCompletionsOptions(
        Arrays.asList(new ChatRequestSystemMessage("Summarize the following clinical note into SOAP format."),
                      new ChatRequestUserMessage(encounterText))
    );
    // Call Azure OpenAI SDK
}
```

### Security & Privacy

**HIPAA Compliance**:
- Azure OpenAI operates within your Azure compliance boundary.
- **Zero Data Retention**: Configure Azure OpenAI to not store prompts or completions for abuse monitoring (requires Microsoft approval) to ensure max privacy.
- **Encryption**: Data is encrypted in transit and at rest.

### Cost Management
- **Token Limits**: Set max tokens per request.
- **Caching**: Common queries are cached to reduce API calls.
- **Rate Limiting**: Per-user rate limits to prevent abuse.

## Local Testing
For local development, you can mock the OpenAI service to avoid costs.

```yaml
# application-dev.yml
azure:
  openai:
    enabled: false # Uses MockOpenAIService
```
