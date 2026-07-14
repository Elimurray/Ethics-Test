import type { Scenario } from '../types';

export const taylorInducements: Scenario = {
  id: 'taylor-inducements',
  name: 'Taylor — the hospitality gradient',
  summary:
    'Walkthrough of the Taylor inducement scenario: each escalating offer is highlighted and mapped to ENZ Code rules, then assembled into the answers.',
  facts: [
    { text: 'Taylor is a professional engineer working for a local council and is involved in evaluating suppliers and making recommendations for upcoming infrastructure projects. Taylor is approached by a supplier, BuildCo, who is interested in working with the council. (A) Taylor receives an invitation from BuildCo to attend ' },
    { text: 'a public product launch event', tokenId: 's1' },
    { text: '. The event includes presentations, networking, and light refreshments. Many other engineers and industry professionals will be attending. (A1) At the event, Taylor speaks with a BuildCo representative. The following day, Taylor is invited to ' },
    { text: 'a small private lunch with senior BuildCo staff to \u201cdiscuss upcoming opportunities with the council\u201d', tokenId: 's2' },
    { text: '. (A2) After the lunch, BuildCo offers Taylor ' },
    { text: 'tickets to a major sporting event, including hospitality', tokenId: 's3' },
    { text: ', saying it is a \u201cthank you for taking the time to meet.\u201d (A3) BuildCo later offers to ' },
    { text: 'fly Taylor to another city to visit one of their project sites, with all travel and accommodation covered', tokenId: 's4' },
    { text: '. They suggest this will help Taylor \u201cbetter understand their capabilities\u201d before upcoming procurement decisions.' },
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
