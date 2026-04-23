export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  tasksCompleted?: number;
  activeCampaigns?: number;
  efficiency?: number;
  leadsContacted?: number;
  appointmentsBooked?: number;
  conversionRate?: number;
  applicantsScreened?: number;
  checksPending?: number;
  timeToHire?: string;
  shiftsScheduled?: number;
  payrollProcessed?: boolean;
  billingStatus?: string;
}

export interface ApprovalItem {
  id: number;
  type: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface Partner {
  id: string;
  name: string;
  type: 'Physician' | 'Wealth Advisor' | 'Attorney' | 'Family Office' | 'Discharge Planner' | 'Retirement Planner' | 'Geriatric Care Manager';
  status: 'cold' | 'outreach_sent' | 'responded' | 'meeting_scheduled' | 'partnered';
  lastActivity: string;
  contactPerson: string;
  potentialValue: 'High' | 'Ultra High';
}

export interface PartnershipCampaign {
  id: string;
  targetType: string;
  delivered: number;
  opened: number;
  replied: number;
  meetingsSet: number;
}
