import type { Scenario } from '../types';
import { alexBeam } from './alex-beam';
import { leoSoftstruc } from './leo-softstruc';
import { janeSubcontractor } from './jane-subcontractor';
import { daveDualEngagement } from './dave-dual-engagement';
import { taylorInducements } from './taylor-inducements';

// Add new scenarios here as they are created.
export const scenarios: Scenario[] = [
  alexBeam,
  leoSoftstruc,
  janeSubcontractor,
  daveDualEngagement,
  taylorInducements,
];
