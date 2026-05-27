export interface SecurityLog {
  timestamp: string;
  prompt: string;
  decision: string;
  risk_score: number;
  threat_type: string;
}

export interface RuntimeLog {
  timestamp: string;
  tool: string;
  status: string;
  message: string;
}