import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AnalysisRequest {
  imageUrl: string;
  patientHistory?: string;
  symptoms?: string[];
}

interface TreatmentSuggestion {
  condition: string;
  confidence: number;
  recommendations: string[];
  evidence: {
    source: string;
    link: string;
    relevance: number;
  }[];
}

export const analyzeImage = async (request: AnalysisRequest): Promise<TreatmentSuggestion[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are a dental AI assistant analyzing dental images and providing evidence-based recommendations."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this dental image. Patient history: ${request.patientHistory || 'Not provided'}. Symptoms: ${request.symptoms?.join(', ') || 'Not provided'}`
            },
            {
              type: "image_url",
              image_url: request.imageUrl
            }
          ]
        }
      ],
      max_tokens: 500
    });

    // Process and structure the response
    const analysis = response.choices[0].message.content;
    return processAnalysis(analysis);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export const generateTreatmentPlan = async (
  condition: string,
  patientData: any
): Promise<any> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a dental treatment planning assistant providing evidence-based recommendations."
        },
        {
          role: "user",
          content: `Generate a comprehensive treatment plan for ${condition}. Patient data: ${JSON.stringify(patientData)}`
        }
      ],
      max_tokens: 1000
    });

    return processTreatmentPlan(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating treatment plan:', error);
    throw error;
  }
};

export const getEvidenceBasedGuidelines = async (
  condition: string
): Promise<any> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a dental research assistant providing evidence-based guidelines from reputable sources."
        },
        {
          role: "user",
          content: `Provide evidence-based guidelines for treating ${condition}, including citations from peer-reviewed sources.`
        }
      ],
      max_tokens: 1000
    });

    return processGuidelines(response.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching guidelines:', error);
    throw error;
  }
};

// Helper functions to process API responses
const processAnalysis = (analysis: string | null): TreatmentSuggestion[] => {
  // Implementation would parse the GPT response into structured data
  // This is a mock implementation
  return [{
    condition: "Sample Condition",
    confidence: 0.95,
    recommendations: ["Sample recommendation"],
    evidence: [{
      source: "Journal of Dental Research",
      link: "https://example.com",
      relevance: 0.9
    }]
  }];
};

const processTreatmentPlan = (plan: string | null): any => {
  // Implementation would parse the GPT response into structured data
  return {
    steps: [],
    timeline: [],
    considerations: []
  };
};

const processGuidelines = (guidelines: string | null): any => {
  // Implementation would parse the GPT response into structured data
  return {
    recommendations: [],
    sources: [],
    evidenceLevel: ""
  };
};