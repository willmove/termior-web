export interface TerminalPalette {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
}

export interface TermiorTheme {
  id: string;
  name: string;
  nativeAppearance: 'Dark' | 'Light';
  description: {
    zh: string;
    en: string;
  };
  palette: {
    background: string;
    foreground: string;
    chrome: string;
    panel: string;
    elevated: string;
    overlay: string;
    accent: string;
    status: [string, string, string, string]; // info, success, warning, danger
    diff: [string, string, string]; // added, removed, context
    terminal: TerminalPalette;
  };
}

// Helper matching crates/termior-theme/src/lib.rs `styled_theme` & `blend`
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function blend(aHex: string, bHex: string, amount: number): string {
  const [ar, ag, ab] = hexToRgb(aHex);
  const [br, bg, bb] = hexToRgb(bHex);
  return rgbToHex(
    ar * (1 - amount) + br * amount,
    ag * (1 - amount) + bg * amount,
    ab * (1 - amount) + bb * amount
  );
}

function buildStyledTheme(
  id: string,
  name: string,
  descZh: string,
  descEn: string,
  colors: {
    background: string;
    accent: string;
    red: string;
    green: string;
    yellow: string;
    magenta: string;
    cyan: string;
  }
): TermiorTheme {
  const white = '#ffffff';
  const pureBlack = '#000000';
  const bg = colors.background;
  const fg = blend(bg, white, 0.9);
  return {
    id,
    name,
    nativeAppearance: 'Dark',
    description: { zh: descZh, en: descEn },
    palette: {
      background: bg,
      foreground: fg,
      chrome: blend(bg, white, 0.14),
      panel: blend(bg, pureBlack, 0.35),
      elevated: blend(bg, white, 0.08),
      overlay: blend(bg, white, 0.2),
      accent: colors.accent,
      status: [colors.accent, colors.green, colors.yellow, colors.red],
      diff: [blend(colors.green, bg, 0.22), blend(colors.red, bg, 0.22), blend(fg, bg, 0.58)],
      terminal: {
        black: blend(bg, white, 0.1),
        red: colors.red,
        green: colors.green,
        yellow: colors.yellow,
        blue: colors.accent,
        magenta: colors.magenta,
        cyan: colors.cyan,
        white: blend(bg, white, 0.84),
        brightBlack: blend(bg, white, 0.3),
        brightRed: blend(colors.red, white, 0.18),
        brightGreen: blend(colors.green, white, 0.18),
        brightYellow: blend(colors.yellow, white, 0.16),
        brightBlue: blend(colors.accent, white, 0.2),
        brightMagenta: blend(colors.magenta, white, 0.18),
        brightCyan: blend(colors.cyan, white, 0.18),
        brightWhite: blend(bg, white, 0.96),
      },
    },
  };
}

export const TERMIOR_THEMES: TermiorTheme[] = [
  {
    id: 'default',
    name: 'Termior Default',
    nativeAppearance: 'Dark',
    description: {
      zh: 'Termior 默认深色原生色板，高对比冷调工业蓝，兼顾长时终端阅读与 Diff 审阅。',
      en: 'Default dark native palette with high-contrast precision blue for extended PTY & diff review.',
    },
    palette: {
      background: '#0d1117',
      foreground: '#e6edf3',
      chrome: '#1c2128',
      panel: '#010409',
      elevated: '#161b22',
      overlay: '#21262d',
      accent: '#2f81f7',
      status: ['#2f81f7', '#3fb950', '#d29922', '#f85149'],
      diff: ['#3fb950', '#f85149', '#8b949e'],
      terminal: {
        black: '#484f58',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39c5cf',
        white: '#b1bac4',
        brightBlack: '#6e7681',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d4dd',
        brightWhite: '#f0f6fc',
      },
    },
  },
  buildStyledTheme(
    'tokyo-night',
    'Tokyo Night',
    '灵感源自东京夜景的霓虹靛蓝与青紫配色，层次分明。',
    'Neon indigo and cyan highlights inspired by Tokyo nights.',
    {
      background: '#1a1b26',
      accent: '#7aa2f7',
      red: '#f7768e',
      green: '#9ece6a',
      yellow: '#e0af68',
      magenta: '#bb9af7',
      cyan: '#7dcfff',
    }
  ),
  buildStyledTheme(
    'catppuccin',
    'Catppuccin',
    '柔和粉彩摩卡深色系，薰衣草紫主色调，舒适护眼。',
    'Soothing pastel Mocha dark palette with lavender accents.',
    {
      background: '#1e1e2e',
      accent: '#cba6f7',
      red: '#f38ba8',
      green: '#a6e3a1',
      yellow: '#f9e2af',
      magenta: '#f5c2e7',
      cyan: '#89dceb',
    }
  ),
  {
    id: 'nord',
    name: 'Nord',
    nativeAppearance: 'Dark',
    description: {
      zh: '北极冰川冷色调色板，低饱和冰蓝与雪白文本。',
      en: 'Arctic north-bluish clean palette with frost cyan accents.',
    },
    palette: {
      background: '#2e3440',
      foreground: '#d8dee9',
      chrome: '#3b4252',
      panel: '#242933',
      elevated: '#3b4252',
      overlay: '#434c5e',
      accent: '#88c0d0',
      status: ['#81a1c1', '#a3be8c', '#ebcb8b', '#bf616a'],
      diff: ['#a3be8c', '#bf616a', '#4c566a'],
      terminal: {
        black: '#3b4252',
        red: '#bf616a',
        green: '#a3be8c',
        yellow: '#ebcb8b',
        blue: '#81a1c1',
        magenta: '#b48ead',
        cyan: '#88c0d0',
        white: '#e5e9f0',
        brightBlack: '#4c566a',
        brightRed: '#bf616a',
        brightGreen: '#a3be8c',
        brightYellow: '#ebcb8b',
        brightBlue: '#81a1c1',
        brightMagenta: '#b48ead',
        brightCyan: '#8fbcbb',
        brightWhite: '#eceff4',
      },
    },
  },
  buildStyledTheme(
    'tide',
    'Tide',
    '深海潮汐青绿主调，清爽敏锐的现代终端风格。',
    'Deep ocean slate paired with vibrant teal and seafoam green.',
    {
      background: '#101820',
      accent: '#4fd1c5',
      red: '#ff6b6b',
      green: '#68d391',
      yellow: '#f6c453',
      magenta: '#9f7aea',
      cyan: '#63b3ed',
    }
  ),
  buildStyledTheme(
    'claude',
    'Claude',
    '温暖陶土与羊皮纸深褐底色，专为 Agent 协作对话调校。',
    'Warm terracotta and deep espresso tones tuned for agentic workflows.',
    {
      background: '#26201d',
      accent: '#d97757',
      red: '#c15f3c',
      green: '#7f9b76',
      yellow: '#e0a458',
      magenta: '#ac7b9b',
      cyan: '#6f9e99',
    }
  ),
  buildStyledTheme(
    'gruvbox',
    'Gruvbox',
    '经典复古暖调高对比方案，琥珀黄与橄榄绿语义色。',
    'Retro groove warm contrast with amber gold and olive semantics.',
    {
      background: '#282828',
      accent: '#d79921',
      red: '#cc241d',
      green: '#98971a',
      yellow: '#d79921',
      magenta: '#b16286',
      cyan: '#689d6a',
    }
  ),
  buildStyledTheme(
    'rose-pine',
    'Rose Pine',
    '自然松木深紫底色配玫瑰金与雾青高光。',
    'All natural pine, faux fur and a bit of soho vibes for the classy minimalist.',
    {
      background: '#191724',
      accent: '#ebbcba',
      red: '#eb6f92',
      green: '#9ccfd8',
      yellow: '#f6c177',
      magenta: '#c4a7e7',
      cyan: '#9ccfd8',
    }
  ),
  buildStyledTheme(
    'sage',
    'Sage',
    '鼠尾草森林深绿底板，温润自然的植物系代码工作台。',
    'Botanical forest dark canvas with calm sage green accents.',
    {
      background: '#17201b',
      accent: '#8fb996',
      red: '#d47766',
      green: '#8fb996',
      yellow: '#d8b26e',
      magenta: '#b19ac7',
      cyan: '#78aaa1',
    }
  ),
  buildStyledTheme(
    'caffeine',
    'Caffeine',
    '浓缩咖啡烘焙色调，焦糖铜主色，适合深夜编码。',
    'Roasted espresso dark theme with warm caramel copper highlights.',
    {
      background: '#201a17',
      accent: '#d08c60',
      red: '#e05d44',
      green: '#a3b18a',
      yellow: '#d4a373',
      magenta: '#b5838d',
      cyan: '#84a59d',
    }
  ),
  {
    id: 'default-light',
    name: 'Termior Default Light',
    nativeAppearance: 'Light',
    description: {
      zh: '原生浅色配对主题，适合明亮环境与 FollowSystem 自动切换。',
      en: 'Crisp daylight native palette paired for FollowSystem mode.',
    },
    palette: {
      background: '#ffffff',
      foreground: '#1f2328',
      chrome: '#eaeef2',
      panel: '#f6f8fa',
      elevated: '#ffffff',
      overlay: '#ffffff',
      accent: '#0969da',
      status: ['#0969da', '#1a7f37', '#9a6700', '#cf222e'],
      diff: ['#1a7f37', '#cf222e', '#57606a'],
      terminal: {
        black: '#24292f',
        red: '#cf222e',
        green: '#116329',
        yellow: '#4d2d00',
        blue: '#0969da',
        magenta: '#8250df',
        cyan: '#1b7c83',
        white: '#6e7781',
        brightBlack: '#57606a',
        brightRed: '#a40e26',
        brightGreen: '#2da44e',
        brightYellow: '#bf8700',
        brightBlue: '#218bff',
        brightMagenta: '#a475f9',
        brightCyan: '#3192aa',
        brightWhite: '#8c959f',
      },
    },
  },
  {
    id: 'nord-light',
    name: 'Nord Light',
    nativeAppearance: 'Light',
    description: {
      zh: 'Nord Snow Storm 浅色原生配对方案，柔和不刺眼。',
      en: 'Nord Snow Storm light native counterpart with soft contrast.',
    },
    palette: {
      background: '#eceff4',
      foreground: '#2e3440',
      chrome: '#d8dee9',
      panel: '#e0e4ec',
      elevated: '#f5f7fb',
      overlay: '#ffffff',
      accent: '#5e81ac',
      status: ['#5e81ac', '#a3be8c', '#ebcb8b', '#bf616a'],
      diff: ['#a3be8c', '#bf616a', '#4c566a'],
      terminal: {
        black: '#2e3440',
        red: '#bf616a',
        green: '#a3be8c',
        yellow: '#ebcb8b',
        blue: '#5e81ac',
        magenta: '#b48ead',
        cyan: '#88c0d0',
        white: '#e5e9f0',
        brightBlack: '#4c566a',
        brightRed: '#bf616a',
        brightGreen: '#a3be8c',
        brightYellow: '#ebcb8b',
        brightBlue: '#81a1c1',
        brightMagenta: '#b48ead',
        brightCyan: '#8fbcbb',
        brightWhite: '#eceff4',
      },
    },
  },
];
