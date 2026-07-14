import type { Scenario } from '../types';

export const janeSubcontractor: Scenario = {
  id: 'jane-subcontractor',
  name: 'Jane — partner at a subcontractor',
  summary:
    'Walkthrough of the Jane conflict-of-interest scenario: fact phrases are highlighted and mapped to ENZ Code rules, then assembled into the answers.',
  facts: [
    { text: 'Jane is a graduate engineer working for a consultancy that is preparing a proposal for a major transport infrastructure project. Jane is part of the technical team contributing design calculations and supporting documentation. ' },
    { text: 'Jane\u2019s partner works for a subcontracting company that is likely to be involved in the project if Jane\u2019s firm is successful', tokenId: 's1' },
    { text: '. ' },
    { text: 'Jane is not directly involved in selecting subcontractors', tokenId: 's2' },
    { text: ', but their ' },
    { text: 'work will influence which subcontractors are suitable', tokenId: 's3' },
    { text: '. ' },
    { text: 'Jane has not discussed the project with their partner and believes they can remain objective', tokenId: 's4' },
    { text: '. (A) As the proposal develops, ' },
    { text: 'Jane is asked to assist in evaluating which subcontractors are best suited for part of the project, this includes reviewing options that involve their partner\u2019s company', tokenId: 's5' },
    { text: '.' },
  ],
  steps: [
    { kind: 'annotation', tokenId: 's1', role: 'pro', tag: 'Rule 5(a)(iii)', title: 'A relationship conflict',
      body: 'Her partner\u2019s employer benefits if her firm wins. A conflict of interest can be relationship-based, not just financial — and this is one.' },
    { kind: 'annotation', tokenId: 's2', role: 'gray', tag: 'Context', title: 'Not the decision-maker',
      body: 'She does not choose subcontractors, which limits the conflict on the base facts.' },
    { kind: 'annotation', tokenId: 's3', role: 'pro', tag: 'Rule 5(a)(iii)', title: 'But her work steers it',
      body: 'Her outputs shape which subcontractors are suitable, so her judgement is entangled with her partner\u2019s interest. That is enough for a potential conflict.' },
    { kind: 'annotation', tokenId: 's4', role: 'pro', tag: 'Perception', title: 'Objectivity is not the test',
      body: 'Self-certified objectivity does not dissolve a conflict — a conflict is also about how it looks to a reasonable outsider. On the base facts: potential and perceived.' },
    { kind: 'annotation', tokenId: 's5', role: 'danger', tag: 'Now actual', title: 'Part (A) flips it',
      body: 'Assessing her partner\u2019s own company turns a potential conflict into an actual one. She must not do this part; it goes to a colleague.' },
    { kind: 'answer', role: 'success', tag: 'Answer 1', title: 'Conflict of interest?', items: [
      'Yes. On the base facts it is potential and perceived, and relationship-based.',
      'It becomes an actual conflict once she is asked to evaluate her partner\u2019s company (part A).' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 2', title: 'What Jane should do', items: [
      'Disclose it in writing to her firm / the relevant decision-maker now, before the proposal develops.',
      'Ask to be screened from anything touching subcontractor selection.',
      'Do not rely on self-assessed objectivity to manage it.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 3', title: 'Continue? + rules', items: [
      'On base facts she can keep doing general technical work if a screen is in place.',
      'In part A she must recuse from evaluating her partner\u2019s company and hand it to a colleague.',
      'Rule 5(a)(iii) — disclose and manage conflicts. Rule 5(a)(i) — objectivity and integrity.' ] },
  ],
};
