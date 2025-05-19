import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FileText, Plus, X } from 'lucide-react';

interface NoteTemplate {
  id: string;
  title: string;
  content: string;
  type: 'progress' | 'observation' | 'recommendation';
  tags: string[];
}

interface NoteTemplateProps {
  templates: NoteTemplate[];
  onSelect: (template: NoteTemplate) => void;
  onSave?: (template: NoteTemplate) => void;
  onDelete?: (templateId: string) => void;
}

export const NoteTemplate = ({ templates, onSelect, onSave, onDelete }: NoteTemplateProps) => {
  const [showForm, setShowForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<NoteTemplate>>({
    title: '',
    content: '',
    type: 'progress',
    tags: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave && newTemplate.title && newTemplate.content) {
      onSave({
        id: Date.now().toString(),
        title: newTemplate.title,
        content: newTemplate.content,
        type: newTemplate.type || 'progress',
        tags: newTemplate.tags || []
      });
      setNewTemplate({ title: '', content: '', type: 'progress', tags: [] });
      setShowForm(false);
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Note Templates</h3>
          <Button
            variant="outline"
            size="sm"
            icon={showForm ? <X size={16} /> : <Plus size={16} />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'New Template'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 border-b pb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Title
              </label>
              <input
                type="text"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                placeholder="Enter template title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Content
              </label>
              <textarea
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                rows={4}
                placeholder="Enter template content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newTemplate.type}
                onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as any })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
              >
                <option value="progress">Progress</option>
                <option value="observation">Observation</option>
                <option value="recommendation">Recommendation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newTemplate.tags?.join(', ')}
                onChange={(e) => setNewTemplate({ 
                  ...newTemplate, 
                  tags: e.target.value.split(',').map(tag => tag.trim()) 
                })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                placeholder="Enter tags..."
              />
            </div>

            <Button type="submit" variant="primary">
              Save Template
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border rounded-lg hover:border-[#0073b9] transition-colors cursor-pointer"
              onClick={() => onSelect(template)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{template.title}</h4>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant={
                        template.type === 'progress' ? 'success' :
                        template.type === 'observation' ? 'info' : 'warning'
                      }
                      size="sm"
                      className="mr-2"
                    >
                      {template.type}
                    </Badge>
                    {template.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(template.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{template.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};