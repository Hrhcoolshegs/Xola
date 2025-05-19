interface NoteTemplate {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: 'examination' | 'procedure' | 'followup';
}

const templates: NoteTemplate[] = [
  {
    id: 'exam-normal',
    title: 'Normal Examination',
    content: 'Patient presents with normal dental condition. No signs of decay or periodontal disease. Oral hygiene is satisfactory.',
    keywords: ['examination', 'normal', 'healthy'],
    category: 'examination'
  },
  {
    id: 'cavity-treatment',
    title: 'Cavity Treatment',
    content: 'Dental caries identified on tooth #{{tooth}}. Treatment plan includes removal of decay and composite filling.',
    keywords: ['cavity', 'filling', 'decay'],
    category: 'procedure'
  },
  {
    id: 'followup-standard',
    title: 'Standard Follow-up',
    content: 'Follow-up examination shows proper healing. No complications reported. Continue normal oral hygiene routine.',
    keywords: ['followup', 'healing', 'routine'],
    category: 'followup'
  }
];

export const noteTemplateService = {
  getTemplates: () => templates,
  
  getTemplateById: (id: string) => templates.find(t => t.id === id),
  
  searchTemplates: (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return templates.filter(template =>
      template.keywords.some(keyword => keyword.includes(lowercaseQuery)) ||
      template.title.toLowerCase().includes(lowercaseQuery)
    );
  },
  
  applyTemplate: (templateId: string, variables: Record<string, string>) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return '';
    
    let content = template.content;
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(`{{${key}}}`, value);
    });
    
    return content;
  }
};