import errorPng from './assets/error.png'
import installPng from './assets/install.png'
import computerPng from './assets/computer.png'
import txtPng from './assets/txt.png'
import exePng from './assets/exe.png'
import notePng from './assets/note.png'
import jpgPng from './assets/bmp.png'
import bmpPng from './assets/bmp2.png'
import wavPng from './assets/wav.png'
import batPng from './assets/bat.png'
import unknownPng from './assets/unknown.png'
import iniPng from './assets/ini.png'

export const CALCULATOR = {
  type: 'calculator',
  title: 'Calculator',
}

export const MINESWEEPER = {
  type: 'minesweeper',
  title: 'Minesweeper',
}

export const RESIZEABLE_SIDES = {
  top: false,
  right: true,
  bottom: true,
  left: false,
  topRight: false,
  bottomRight: true,
  bottomLeft: false,
  topLeft: false,
}

export const DESKTOP_ICONS = [
  // TODO: icon for auto deleter
  {
    type: 'folder',
    name: 'My Computer',
    image: computerPng,
    isFolder: true,
    path: '/',
  },
  {
    type: 'folder',
    name: 'Calculator',
    image: installPng,
    onDoubleClick: () => CALCULATOR,
  },
  {
    type: 'folder',
    name: 'Minesweeper',
    image: installPng,
    onDoubleClick: () => MINESWEEPER,
  },
]

export const HELP_PROMPT = {
  type: 'prompt',
  image: errorPng,
  title: 'Windows has encountered an error',
  label: 'Help not found.',
}

export const EXTENSION_IMAGES = {
  exe: exePng,
  txt: txtPng,
  doc: notePng,
  dll: batPng,
  bat: batPng,
  bmp: bmpPng,
  jpg: jpgPng,
  gif: jpgPng,
  ini: iniPng,
  cfg: unknownPng,
  wav: wavPng,
}
