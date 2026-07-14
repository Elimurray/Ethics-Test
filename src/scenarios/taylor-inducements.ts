import type { Scenario } from '../types';

export const taylorInducements: Scenario = {
  id: 'taylor-inducements',
  name: 'Taylor — the hospitality gradient',
  summary:
    'Walkthrough of the Taylor inducement scenario: each escalating offer is highlighted and mapped to ENZ Code rules, then assembled into the answers.',
  facts: [
    { text: 'Taylor, a council engineer, evaluates suppliers and recommends them for projects. Supplier BuildCo engages. First: an invite to a ' },
    { text: 'public product launch with light refreshments, many attendees', tokenId: 's1' },
    { text: '. Then, the next day, a ' },
    { text: 'small private lunch with senior staff to \u201cdiscuss council opportunities\u201d', tokenId: 's2' },
    { text: '. Then ' },
    { text: 'tickets to a major sporting event with hospitality, as a \u201cthank you\u201d', tokenId: 's3' },
    { text: '. Finally, an offer to ' },
    { text: 'fly Taylor to a project site, all travel and accommodation paid, before procurement decisions', tokenId: 's4' },
    { text: '.' },
  ],
  steps: [
    { kind: 'annotation', tokenId: 's1', role: 'success', tag: 'Stage 1 · usually OK', title: 'A public event',
      body: 'Public, low value, many attendees, not tied to a live decision. Generally fine — stay transparent and disclose if unsure. Rule 5(a)(iii) sits in the background.' },
    { kind: 'annotation', tokenId: 's2', role: 'warning', tag: 'Stage 2', title: 'Now private and selective',
      body: 'Private, selective, and explicitly linked to procurement. Perception risk jumps. Decline, or engage only on a disclosed, recorded, non-exclusive basis.' },
    { kind: 'annotation', tokenId: 's3', role: 'pro', tag: 'Stage 3 · Rule 5(a)(iii)', title: 'This is an inducement',
      body: 'Significant personal value from a supplier Taylor evaluates. Inducements always create a conflict of interest under Rule 5(a)(iii). Decline and document the offer.' },
    { kind: 'annotation', tokenId: 's4', role: 'danger', tag: 'Stage 4 · Rule 5(b)(ii)', title: 'Improper influence',
      body: 'Paid travel \u201cbefore procurement decisions\u201d crosses into Rule 5(b)(ii) — accepting something intended to improperly influence your engineering activities. A hard no.' },
    { kind: 'answer', role: 'success', tag: 'Answer 1', title: 'Where is the line?', items: [
      'Public event — acceptable.',
      'Private lunch — raises perception risk; disclose or decline.',
      'Sporting tickets — an inducement (Rule 5(a)(iii)).',
      'Paid travel before a decision — improper influence (Rule 5(b)(ii)).' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 2', title: 'What Taylor should do', items: [
      'Attend the public event transparently.',
      'Decline or limit the private lunch; keep it disclosed and recorded.',
      'Decline and document the sporting tickets.',
      'Decline the paid travel outright. If a site visit is genuinely needed, the council arranges and funds it through its own process.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 3', title: 'Rules + principle', items: [
      'Rule 5(a)(iii) — inducements (gifts, travel, hospitality) always create a conflict of interest.',
      'Rule 5(b)(ii) — must not accept anything intended to improperly influence your engineering activities.',
      'As offers move public to private, cheap to valuable, generic to decision-linked, you move from \u201cdisclose and manage\u201d to \u201crefuse.\u201d' ] },
  ],
};
