console.log('Init WAMATP')

const stageEl = document.getElementById('stage')
console.log('Got stage element', stageEl)

import {generateFace} from './lib/gfx/FaceGenerator'
generateFace('test', 500, 500)
