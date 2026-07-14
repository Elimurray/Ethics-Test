import type { Scenario } from '../types';

export const daveDualEngagement: Scenario = {
  id: 'dave-dual-engagement',
  name: 'Dave — designing and assessing',
  summary:
    'Walkthrough of the Dave dual-engagement scenario: fact phrases are highlighted and mapped to ENZ Code rules, then assembled into the answers.',
  facts: [
    { text: 'Dave is an engineer working for a consultancy that has been ' },
    { text: 'engaged by a property developer to assist with the design of a new industrial facility', tokenId: 's1' },
    { text: '. At the same time, Dave consultancy has been ' },
    { text: 'contracted by the local council to undertake an independent environmental impact assessment', tokenId: 's2' },
    { text: ' of developments in the same area. ' },
    { text: 'Dave is assigned to both projects', tokenId: 's3' },
    { text: '. As the work progresses, it becomes clear that the ' },
    { text: 'council\u2019s assessment will include reviewing the environmental impacts of the developer\u2019s project', tokenId: 's4' },
    { text: '. ' },
    { text: 'Dave has access to confidential information from both clients', tokenId: 's5' },
    { text: '.' },
  ],
  steps: [
    { kind: 'annotation', tokenId: 's1', role: 'gray', tag: 'Client one', title: 'The developer',
      body: 'The developer wants the industrial facility designed and the project to proceed.' },
    { kind: 'annotation', tokenId: 's2', role: 'gray', tag: 'Client two', title: 'The council',
      body: 'The council is paying for an independent environmental assessment of developments in the area.' },
    { kind: 'annotation', tokenId: 's3', role: 'pro', tag: 'Rule 5(a)(iii)', title: 'Both sides at once',
      body: 'Dave sits on both engagements, whose interests diverge: the developer wants approval, the council wants objectivity.' },
    { kind: 'annotation', tokenId: 's4', role: 'danger', tag: 'The killer fact', title: 'Independence is impossible',
      body: 'The \u201cindependent\u201d assessment now reviews a project his own firm is designing. You cannot independently assess your own work — this cannot be managed by disclosure alone.' },
    { kind: 'annotation', tokenId: 's5', role: 'warning', tag: 'Rule 7', title: 'Confidentiality both ways',
      body: 'Dave holds confidential information from both clients. He cannot use one client\u2019s information in the other engagement, or disclose it, without authorisation.' },
    { kind: 'answer', role: 'success', tag: 'Answer 1', title: 'Conflict of interest?', items: [
      'Yes — an actual two-client conflict.',
      'The thing the council is paying for (independence) is destroyed if the firm assesses a project it is designing.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 2', title: 'What Dave should do', items: [
      'Disclose the dual engagement to both clients in writing immediately.',
      'Withdraw from one side of the overlap — realistically the firm cannot perform the independent assessment of a project it is engaged to design.',
      'Arrange genuinely independent assessors for the council.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 3', title: 'Continue? + rules', items: [
      'No — he should not continue on both sides of the overlap.',
      'Rule 5(a)(iii) — disclose and manage: act for one and tell the other, act for neither, or bring in an independent advisor.',
      'Rule 5(a)(i) — objectivity. Rule 7 — confidentiality across the two clients.' ] },
  ],
};
