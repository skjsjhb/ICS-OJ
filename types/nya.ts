export type TestContext = {
  session: string;
  lang: string;
  source: string;
  driver: string;
  env: Record<string, string>;
};

export type TestResult = {
  id: string;
  error: string; // Internal error
  context: TestContext;
  time: number;
  runner: string;
  runnerVersion: string;
  assembleExceptions: AssembleExceptionSummary[];
  assembleOK: boolean;
  sac: SACSimilarityRecord[];
  units: TestUnitResult[];
};

export interface AssembleExceptionSummary {
  lineNo: number;
  level: "warn" | "error";
  message: string;
}

export interface SACSimilarityRecord {
  id: string;
  confidence: number;
}

export type TestUnitStatus = "AC" | "WA" | "RE" | "TLE" | "IEE";

export type TestUnitResult = {
  status: TestUnitStatus;

  output: {
    expected: string;
    received: string;
  };

  input: string;

  stats: {
    instrCount: number;
    memRead: number;
    memWrite: number;
  };

  runtimeExceptions: RuntimeExceptionSummary[];

  time: number;
};

export interface RuntimeExceptionSummary {
  addr: number;
  instr: number;
  level: "warn" | "error";
  message: string;
}
