import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { FileText, Save, RotateCcw } from 'lucide-react';

const TEMPLATES = {
  '#clean': `Hygiene Appointment Notes:
- Full mouth prophylaxis performed
- Light to moderate calculus removed
- Normal bleeding on probing
- Oral hygiene instructions provided
- Patient advised to maintain regular brushing and flossing
- Next recall appointment recommended in 6 months`,

  '#xray': `Radiograph Findings:
- Radiographs taken: FMX/4BWX/2PA
- No evidence of caries or periapical pathology
- Bone levels within normal limits
- No significant changes from previous radiographs
- Images saved to patient record`,

  '#filling': `Restoration Procedure:
- Local anesthetic administered: 1 carpule 2% lidocaine 1:100,000 epi
- Caries removed from tooth #[X]
- Composite restoration placed
- Occlusion checked and adjusted
- Final polish completed
- Patient tolerated procedure well`,

  '#extract': `Extraction Procedure:
- Local anesthetic administered
- Tooth #[X] extracted atraumatically
- Socket debrided and irrigated
- Hemostasis achieved
- Post-operative instructions provided
- Rx: Ibuprofen 600mg q6h prn pain`,

  '#exam': `Comprehensive Examination:
1. Extra-oral examination:
   - TMJ: WNL
   - Lymph nodes: Non-palpable
   - Facial symmetry: Normal

2. Intra-oral examination:
   - Soft tissues: WNL
   - Periodontal: Healthy
   - Occlusion: Class I

3. Hard tissue examination:
   - No visible caries
   - Existing restorations intact
   - No apparent pathology

4. Treatment recommendations:
   - Continue regular hygiene visits
   - Maintain home care routine`
};

interface ClinicalNotesProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export const ClinicalNotes = ({ initialValue = '', onChange }: ClinicalNotesProps) => {
  const [notes, setNotes] = useState(initialValue);
  const [history, setHistory] = useState<string[]>([initialValue]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNotes(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ' ' && !e.ctrlKey && !e.metaKey) {
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.slice(0, cursorPosition);
      const words = textBeforeCursor.split(/\s/);
      const lastWord = words[words.length - 1];

      if (lastWord.startsWith('#') && TEMPLATES[lastWord as keyof typeof TEMPLATES]) {
        e.preventDefault();
        const template = TEMPLATES[lastWord as keyof typeof TEMPLATES];
        const newText = textBeforeCursor.slice(0, -lastWord.length) + template + textarea.value.slice(cursorPosition);
        
        setNotes(newText);
        onChange?.(newText);
        
        // Add to history
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newText]);
        setHistoryIndex(prev => prev + 1);

        // Set cursor position after template
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = 
            cursorPosition - lastWord.length + template.length;
        }, 0);
      }
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setNotes(history[historyIndex - 1]);
      onChange?.(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setNotes(history[historyIndex + 1]);
      onChange?.(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving notes:', notes);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText size={20} className="text-gray-500" />
          <h3 className="font-medium text-gray-800">Clinical Notes</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            Redo
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Save size={16} />}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <textarea
          ref={textareaRef}
          value={notes}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
          placeholder="Enter clinical notes here..."
        />
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMPLATES).map(([shortcode, _]) => (
            <Badge key={shortcode} variant="outline" size="sm">
              {shortcode}
            </Badge>
          ))}
        </div>
        
        <p className="text-xs text-gray-500">
          Type a shortcode followed by space to expand template
        </p>
      </div>
    </div>
  );
};