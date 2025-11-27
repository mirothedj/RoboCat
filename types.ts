export enum PartType {
  HEAD = 'HEAD',
  TORSO = 'TORSO',
  ARM_RIGHT = 'ARM_RIGHT',
  ARM_LEFT = 'ARM_LEFT',
  LEGS = 'LEGS'
}

export interface PartDefinition {
  id: string;
  type: PartType;
  name: string;
  iconName: string;
  description: string;
  aiTerm: string; // e.g., "Input", "LLM"
  colorTheme: string; // e.g., "cyan", "fuchsia" - for tailwind dynamic classes
}

export interface LevelRequirement {
  partType: PartType;
  correctOptionId?: string; // For multiple choice
  requiredKeywords?: string[]; // For text input
  hint: string;
}

export interface LevelData {
  id: number;
  title: string;
  missionBrief: string;
  missionGoal: string;
  // NEW: The "Bill of Materials" Template. 
  // Maps the generic part (e.g. HEAD) to the specific Lesson Component (e.g. "The Canvas")
  anatomyLabels?: Partial<Record<PartType, string>>;
  requirements: Record<PartType, LevelRequirement>;
  availableOptions: {
    [key in PartType]?: Array<{ id: string; label: string }>;
  };
}

export interface AssembledState {
  [PartType.HEAD]: boolean;
  [PartType.TORSO]: boolean;
  [PartType.ARM_RIGHT]: boolean;
  [PartType.ARM_LEFT]: boolean;
  [PartType.LEGS]: boolean;
}