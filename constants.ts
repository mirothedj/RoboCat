import { LevelData, PartDefinition, PartType } from './types';

// Visual Assets
export const THEME_COLORS: Record<string, string> = {
  fuchsia: '#e879f9',
  cyan: '#22d3ee',
  orange: '#fb923c',
  yellow: '#facc15',
  emerald: '#34d399',
};

// ROBO CAT PATHS
// Redesigned to match the reference image: Rounded shapes, ears, paws.
export const PART_PATHS: Record<PartType, string> = {
  // Head: Rounded rectangle with triangular ears
  [PartType.HEAD]: "M 150,130 Q 150,80 200,80 Q 250,80 250,130 L 250,180 Q 250,200 230,200 L 170,200 Q 150,200 150,180 Z  M 160,80 L 160,40 L 190,75 Z  M 240,80 L 240,40 L 210,75 Z", 
  
  // Torso: Rounded cylindrical body
  [PartType.TORSO]: "M 175,210 L 225,210 Q 240,210 240,230 L 235,280 Q 235,300 200,300 Q 165,300 165,280 L 160,230 Q 160,210 175,210 Z M 190,240 A 10,10 0 1,1 210,240 A 10,10 0 1,1 190,240 Z",
  
  // Right Arm: Segmented tube ending in a round paw
  [PartType.ARM_RIGHT]: "M 240,225 Q 260,225 270,240 Q 280,255 275,270 L 285,285 Q 295,295 285,305 Q 275,315 265,305 L 255,290",
  
  // Left Arm: Mirrored segmented tube
  [PartType.ARM_LEFT]: "M 160,225 Q 140,225 130,240 Q 120,255 125,270 L 115,285 Q 105,295 115,305 Q 125,315 135,305 L 145,290",
  
  // Legs: Short sturdy legs with rounded feet + Tail hint attached to pelvis area
  [PartType.LEGS]: "M 175,300 L 170,340 Q 165,360 150,360 L 190,360 M 225,300 L 230,340 Q 235,360 250,360 L 210,360 M 240,290 Q 270,280 270,260 Q 270,240 255,245" 
};

// Center points for icons (Coordinates matched to NEW Robo Cat SVG paths)
export const PART_CENTERS: Record<PartType, {x: number, y: number}> = {
  [PartType.HEAD]: { x: 200, y: 140 }, // Lowered slightly due to ears
  [PartType.TORSO]: { x: 200, y: 255 },
  [PartType.ARM_LEFT]: { x: 125, y: 265 },
  [PartType.ARM_RIGHT]: { x: 275, y: 265 },
  [PartType.LEGS]: { x: 200, y: 340 },
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

/* 
 * LESSON TEMPLATE STRUCTURE:
 * 
 * Every Agent Lesson follows this "Bill of Materials" template:
 * 1. HEAD (Input): The raw material or control interface.
 * 2. TORSO (System): The context, initialization, or personality.
 * 3. RIGHT ARM (Tool): The specific function or tool used (The "Artist").
 * 4. LEFT ARM (Logic): The workflow or algorithm steps.
 * 5. LEGS (Output): The final export or display method.
 */

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "The Icon Generator",
    missionBrief: "Lesson 1: The Bill of Materials. We are building a creative coding tool. Assemble the code components: Canvas, Controls, Artist Functions, and Export Logic to make the 'Icon Generator' alive.",
    missionGoal: "Map the 'Bill of Materials' to the Agent's anatomy.",
    
    // TEMPLATE MAPPING FOR THIS LESSON
    anatomyLabels: {
      [PartType.HEAD]: "The Controls (UI)",
      [PartType.TORSO]: "The Initialization (Setup)",
      [PartType.ARM_RIGHT]: "The Artist (Functions)",
      [PartType.ARM_LEFT]: "The Event Loop",
      [PartType.LEGS]: "The Camera (Export)"
    },

    availableOptions: {
      [PartType.HEAD]: [
        { id: 'opt_controls', label: 'Button & Text Inputs' }, 
        { id: 'opt_raw_data', label: 'Raw Binary Feed' }, 
        { id: 'opt_sensor', label: 'Lidar Sensor' }
      ],
      [PartType.ARM_RIGHT]: [
        { id: 'opt_hammer', label: 'Pneumatic Hammer' },
        { id: 'opt_artist', label: 'Draw_Shape() Function' }, 
        { id: 'opt_drill', label: 'Laser Drill' }
      ],
      [PartType.ARM_LEFT]: [
        { id: 'opt_workflow', label: 'Click -> Update -> Draw' }, 
        { id: 'opt_random', label: 'Random Number Generation' }
      ],
      [PartType.LEGS]: [
        { id: 'opt_speaker', label: 'Audio Speaker' },
        { id: 'opt_camera', label: 'Save_File(.png)' } 
      ]
    },
    requirements: {
      [PartType.HEAD]: {
        partType: PartType.HEAD,
        correctOptionId: 'opt_controls',
        hint: "We need buttons and input boxes so the user can talk to the program."
      },
      [PartType.TORSO]: {
        partType: PartType.TORSO,
        // Validation checks for concepts related to Initialization/Palette/Canvas
        requiredKeywords: ['canvas', 'palette', 'variables', 'initialization', 'defaults', 'blue', 'star', 'setup'],
        hint: "Phase A: Initialization. We need to set up 'The Canvas' and 'The Palette' (Variables)."
      },
      [PartType.ARM_RIGHT]: {
        partType: PartType.ARM_RIGHT,
        correctOptionId: 'opt_artist',
        hint: "We need reusable blocks of code that know how to draw squares and circles."
      },
      [PartType.ARM_LEFT]: {
        partType: PartType.ARM_LEFT,
        correctOptionId: 'opt_workflow',
        hint: "Connect the logic: Input Detected -> Trigger Refresh -> Draw Symbol."
      },
      [PartType.LEGS]: {
        partType: PartType.LEGS,
        correctOptionId: 'opt_camera',
        hint: "Phase D: Output. We need a function to take what is on the canvas and save it as a file."
      }
    }
  },
  {
    id: 2,
    title: "The Researcher Bot",
    missionBrief: "Lesson 2: Data Pipelines. We need a robot that can consume web content (YouTube) and transform it into a study guide.",
    missionGoal: "Build an agent that watches videos and writes summaries.",

    // TEMPLATE MAPPING FOR THIS LESSON
    anatomyLabels: {
      [PartType.HEAD]: "Data Source (URL)",
      [PartType.TORSO]: "System Persona",
      [PartType.ARM_RIGHT]: "Scraper Tool",
      [PartType.ARM_LEFT]: "Reasoning Chain",
      [PartType.LEGS]: "Final Artifact (Doc)"
    },

    availableOptions: {
      [PartType.HEAD]: [
        { id: 'opt_url', label: 'URL Link Reader' }, 
        { id: 'opt_temp', label: 'Temperature Sensor' },
        { id: 'opt_motion', label: 'Motion Detector' }
      ],
      [PartType.ARM_RIGHT]: [
        { id: 'opt_music', label: 'Music Player' },
        { id: 'opt_scraper', label: 'Transcript_Scraper' }, 
        { id: 'opt_laser', label: 'Mining Laser' }
      ],
      [PartType.ARM_LEFT]: [
        { id: 'opt_logic_res', label: 'Read -> Extract -> Summarize' }, 
        { id: 'opt_logic_run', label: 'See Wall -> Jump -> Run' }
      ],
      [PartType.LEGS]: [
        { id: 'opt_doc', label: 'Write_Document(.txt)' }, 
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