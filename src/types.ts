export type Role = 'gray' | 'danger' | 'warning' | 'pro' | 'success';

/** A run of the fact text. If tokenId is set, this run is a highlightable phrase. */
export interface FactSegment {
  text: string;
  tokenId?: string;
}

/** A step that highlights one fact phrase and explains the rule it triggers. */
export interface AnnotationStep {
  kind: 'annotation';
  tokenId: string;   // must match a FactSegment.tokenId
  role: Role;        // colour family for the pill + highlight
  tag: string;       // pill label, e.g. "Rule 3 · Step 1"
  title: string;
  body: string;
}

/** A step that shows one of the assembled exam answers as a bullet list. */
export interface AnswerStep {
  kind: 'answer';
  role: Role;        // usually 'success'
  tag: string;       // e.g. "Answer 1"
  title: string;     // e.g. "Main issues"
  items: string[];
}

export type Step = AnnotationStep | AnswerStep;

export interface Scenario {
  id: string;         // slug, e.g. "alex-beam"
  name: string;       // display name, e.g. "Alex — the under-designed beam"
  summary: string;    // one line for the sr-only header + picker subtitle
  facts: FactSegment[];
  steps: Step[];
}
