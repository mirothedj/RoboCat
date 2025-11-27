import { LevelData, PartDefinition, PartType } from './types';

// Visual Assets
export const THEME_COLORS: Record<string, string> = {
  fuchsia: '#e879f9',
  cyan: '#22d3ee',
  orange: '#fb923c',
  yellow: '#facc15',
  emerald: '#34d399',
};

export const PART_PATHS: Record<PartType, string> = {
  [PartType.HEAD]: "M 200,80 L 225,90 L 225,120 L 210,135 L 190,135 L 175,120 L 175,90 Z",
  [PartType.TORSO]: "M 170,140 L 230,140 L 250,160 L 240,240 L 200,260 L 160,240 L 150,160 Z",
  [PartType.ARM_LEFT]: "M 145,160 L 120,160 L 100,200 L 115,220 L 135,220 L 140,210 L 155,170 Z",
  [PartType.ARM_RIGHT]: "M 255,160 L 280,160 L 300,200 L 285,220 L 265,220 L 260,210 L 245,170 Z",
  [PartType.LEGS]: "M 160,265 L 240,265 L 250,290 L 250,340 L 220,360 L 180,360 L 150,340 L 150,290 Z"
};

// Center points for icons (Coordinates matched to SVG paths)
export const PART_CENTERS: Record<PartType, {x: number, y: number}> = {
  [PartType.HEAD]: { x: 200, y: 108 },
  [PartType.TORSO]: { x: 200, y: 200 },
  [PartType.ARM_LEFT]: { x: 125, y: 195 },
  [PartType.ARM_RIGHT]: { x: 275, y: 195 },
  [PartType.LEGS]: { x: 200, y: 315 },
};

export const PARTS_INFO: Record<PartType, PartDefinition> = {
  [PartType.HEAD]: {
    id: 'head',
    type: PartType.HEAD,
    name: 'Sensor Head',
    iconName: 'Eye',
    description: 'How the robot sees and reads data.',
    aiTerm: 'Perception / Input',
    colorTheme: 'fuchsia' // Input = Sensory = Purple/Pink
  },
  [PartType.TORSO]: {
    id: 'torso',
    type: PartType.TORSO,
    name: 'Core Processor',
    iconName: 'Cpu',
    description: 'The brain. Defines personality.',
    aiTerm: 'LLM / System Prompt',
    colorTheme: 'cyan' // Processor = Logic = Cyan/Blue
  },
  [PartType.ARM_RIGHT]: {
    id: 'arm_r',
    type: PartType.ARM_RIGHT,
    name: 'Tool Arm',
    iconName: 'Wrench',
    description: 'Ability to use external tools.',
    aiTerm: 'Tools / Actions',
    colorTheme: 'orange' // Tools = Action = Orange
  },
  [PartType.ARM_LEFT]: {
    id: 'arm_l',
    type: PartType.ARM_LEFT,
    name: 'Logic Arm',
    iconName: 'Network',
    description: 'Planning the steps.',
    aiTerm: 'Planning / Reasoning',
    colorTheme: 'yellow' // Planning = Structure = Yellow/Gold
  },
  [PartType.LEGS]: {
    id: 'legs',
    type: PartType.LEGS,
    name: 'Output Drive',
    iconName: 'MonitorUp',
    description: 'Delivering the result.',
    aiTerm: 'Output',
    colorTheme: 'emerald' // Output = Result = Green
  }
};

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "The Artist Bot",
    missionBrief: "Welcome to the Lab, Cadet. We need a robot that can create artwork based on what people describe. Build the 'Icon Generator' agent.",
    missionGoal: "Build an agent that takes text and turns it into a picture.",
    availableOptions: {
      [PartType.HEAD]: [
        { id: 'opt_camera', label: 'Camera Feed' },
        { id: 'opt_text', label: 'User Text Input' }, // Correct
        { id: 'opt_audio', label: 'Microphone' }
      ],
      [PartType.ARM_RIGHT]: [
        { id: 'opt_calculator', label: 'Calculator Tool' },
        { id: 'opt_painter', label: 'Icon_Painter_V1' }, // Correct
        { id: 'opt_weather', label: 'Weather Sensor' }
      ],
      [PartType.ARM_LEFT]: [
        { id: 'opt_logic_art', label: '[Get Description] -> [Draw] -> [Show]' }, // Correct
        { id: 'opt_logic_math', label: '[Get Number] -> [Multiply] -> [Show]' }
      ],
      [PartType.LEGS]: [
        { id: 'opt_speaker', label: 'Audio Speaker' },
        { id: 'opt_screen', label: 'Image Gallery Display' } // Correct
      ]
    },
    requirements: {
      [PartType.HEAD]: {
        partType: PartType.HEAD,
        correctOptionId: 'opt_text',
        hint: "The user will type a description. What allows the robot to read text?"
      },
      [PartType.TORSO]: {
        partType: PartType.TORSO,
        requiredKeywords: ['artist', 'painter', 'draw', 'creative', 'art'],
        hint: "Tell the brain who it is. Is it a chef? A pilot? No, it makes art!"
      },
      [PartType.ARM_RIGHT]: {
        partType: PartType.ARM_RIGHT,
        correctOptionId: 'opt_painter',
        hint: "We need to make pictures. Which tool sounds like it paints?"
      },
      [PartType.ARM_LEFT]: {
        partType: PartType.ARM_LEFT,
        correctOptionId: 'opt_logic_art',
        hint: "Think about the order: Read description first, then draw."
      },
      [PartType.LEGS]: {
        partType: PartType.LEGS,
        correctOptionId: 'opt_screen',
        hint: "If we make a picture, we need to show it on a screen, not play a sound."
      }
    }
  },
  {
    id: 2,
    title: "The Researcher Bot",
    missionBrief: "Good work on the Artist. Now, we need a robot that can watch YouTube videos and summarize the facts for students.",
    missionGoal: "Build an agent that watches videos and writes summaries.",
    availableOptions: {
      [PartType.HEAD]: [
        { id: 'opt_url', label: 'URL Link Reader' }, // Correct
        { id: 'opt_temp', label: 'Temperature Sensor' },
        { id: 'opt_motion', label: 'Motion Detector' }
      ],
      [PartType.ARM_RIGHT]: [
        { id: 'opt_music', label: 'Music Player' },
        { id: 'opt_scraper', label: 'Transcript_Scraper' }, // Correct
        { id: 'opt_laser', label: 'Mining Laser' }
      ],
      [PartType.ARM_LEFT]: [
        { id: 'opt_logic_res', label: '[Read Link] -> [Get Text] -> [Summarize]' }, // Correct
        { id: 'opt_logic_run', label: '[See Wall] -> [Jump] -> [Run]' }
      ],
      [PartType.LEGS]: [
        { id: 'opt_doc', label: 'Text Document Writer' }, // Correct
        { id: 'opt_wheels', label: 'High Speed Wheels' }
      ]
    },
    requirements: {
      [PartType.HEAD]: {
        partType: PartType.HEAD,
        correctOptionId: 'opt_url',
        hint: "YouTube videos are on the web. We need to read the Link (URL)."
      },
      [PartType.TORSO]: {
        partType: PartType.TORSO,
        requiredKeywords: ['research', 'teacher', 'summarize', 'student', 'study', 'fact'],
        hint: "This robot helps students learn. Tell it to be a Researcher or Helper."
      },
      [PartType.ARM_RIGHT]: {
        partType: PartType.ARM_RIGHT,
        correctOptionId: 'opt_scraper',
        hint: "We need to get the words out of the video. A 'Scraper' can do that."
      },
      [PartType.ARM_LEFT]: {
        partType: PartType.ARM_LEFT,
        correctOptionId: 'opt_logic_res',
        hint: "First read, then extract text, then summarize."
      },
      [PartType.LEGS]: {
        partType: PartType.LEGS,
        correctOptionId: 'opt_doc',
        hint: "A summary is usually text. How do we save text?"
      }
    }
  }
];