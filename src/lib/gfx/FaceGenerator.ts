import * as R from 'ramda'
import {range, flatten, max, min, pluck, zip} from 'ramda'
import {Stage, Layer, Circle, Line} from 'konva'

import {
  translateRange,
  getRandomIntFromRange
} from '../math'

interface TwoDimensionalPoint {
  x: number
  y: number
}

function isPointBellow (point:TwoDimensionalPoint, comparisonPoint:TwoDimensionalPoint) {
  if (point.y >= comparisonPoint.y) {
    return true
  }
  return false
}

const Renderer = {
  getRenderedPoint (x: number, y: number): Circle {
    return new Circle({
      radius: 2,
      fill: '#fff',
      x,
      y
    })
  },
  getPolygonFromPoints (points: TwoDimensionalPoint[]): Line {
    const pointsSorted = R.sortWith([
      R.ascend(R.prop('x')),
      R.ascend(R.prop('y'))
    ])(points) as TwoDimensionalPoint[]

    const minPoint = pointsSorted[0]
    const maxPoint = R.last(pointsSorted)

    const pointsBellow = [minPoint].concat(pointsSorted.filter(point => {
      return isPointBellow(point, minPoint) && isPointBellow(point, maxPoint) && !R.equals(point, maxPoint)
    }))
    const pointsBellowPath = flatten ( zip( R.pluck('x', pointsBellow), R.pluck('y', pointsBellow) ) ) as number[]

    const pointsAbove = R.sortWith([
        R.descend(R.prop('x')),
        R.descend(R.prop('y'))
      ]
    )(R.difference(pointsSorted, pointsBellow))
    const pointsAbovePath = flatten ( zip( R.pluck('x', pointsAbove), R.pluck('y', pointsAbove) ) ) as number[]

    return new Line({
      points: pointsBellowPath.concat(pointsAbovePath),
      closed: true,
      stroke: '#fff',
      strokeWidth: 2,
      tension: 0.2
    })
  }
}

class FaceGrid {
  width: number
  height: number
  centerX: number
  centerY: number

  faceWidth: number
  faceHeight: number
  faceTopWidth: number
  faceTopHeight: number
  faceBottomWidth: number
  faceBottomHeight: number

  coordsMap: Array<Array<number>>

  constructor (width: number, height: number) {
    if (width % 2 == 0 || height % 2 == 0) {
      throw new Error('FaceGrid expects uneven width and height!')
    }

    this.width = width
    this.height = height

    this.centerX = Math.floor(width / 2)
    this.centerY = Math.floor(height / 2)

    // Generate the drawing structure
    this.coordsMap = range(0, this.height).map(row => range(0, this.width).map(col => 0))

    // Mark center for debug reasons
    //this.markDrawPoint(this.centerX, this.centerY)

    this.generateFaceDimensions()
    this.generateSkeleton()
  }

  generateFaceDimensions () {
    this.faceWidth = Math.floor(getRandomIntFromRange(
      this.width * 0.25,
      this.width * 0.35
    )/2)
    this.faceHeight = Math.floor(getRandomIntFromRange(
      this.height * 0.25,
      this.height * 0.3
    )/2)

    this.faceBottomWidth = getRandomIntFromRange(this.faceWidth * 0.4, this.faceWidth * 0.7)
    this.faceBottomHeight = getRandomIntFromRange(this.faceHeight * 0.4, this.faceHeight * 0.7)

    this.faceTopWidth = getRandomIntFromRange(this.faceWidth * 0.4, this.faceWidth * 0.7)
    this.faceTopHeight = getRandomIntFromRange(this.faceHeight * 0.4, this.faceHeight * 0.7)
  }

  generateSkeleton () {
    // Main Frame
    this.markDrawPoint(this.centerX + this.faceWidth, this.centerY + this.faceHeight)
    this.markDrawPoint(this.centerX - this.faceWidth, this.centerY + this.faceHeight)
    this.markDrawPoint(this.centerX + this.faceWidth, this.centerY - this.faceHeight)
    this.markDrawPoint(this.centerX - this.faceWidth, this.centerY - this.faceHeight)
    // Bottom
    this.markDrawPoint(this.centerX + this.faceBottomWidth, this.centerY + this.faceHeight + this.faceBottomHeight)
    this.markDrawPoint(this.centerX - this.faceBottomWidth, this.centerY + this.faceHeight + this.faceBottomHeight)
    // Top
    this.markDrawPoint(this.centerX + this.faceTopWidth, this.centerY - this.faceHeight - this.faceTopHeight)
    this.markDrawPoint(this.centerX - this.faceTopWidth, this.centerY - this.faceHeight - this.faceTopHeight)
  }

  markDrawPoint (x: number, y: number) {
    this.coordsMap[y][x] = 1
  }

  getDrawPoints (canvasWidth: number, canvasHeight: number): Array<TwoDimensionalPoint> {
    const points: Array<TwoDimensionalPoint> = []

    this.coordsMap.map((row, y:number) => {
      row.map((val:number, x:number) => {
        if (val === 1) {
          points.push({
            x: translateRange(x, 0, this.width, 0, canvasWidth),
            y: translateRange(y, 0, this.height, 0, canvasHeight),
          })
        }
      })
    })

    return points
  }
}

export function generateFace(canvasId: string, canvasWidth: number, canvasHeight: number) {
  const grid = new FaceGrid(101, 101)
  const points = grid.getDrawPoints(canvasWidth, canvasHeight)

  const stage = new Stage({
    container: canvasId,
    width: canvasWidth,
    height: canvasHeight
  })
  const layer = new Layer()

  // Draw the face outline
  const line = Renderer.getPolygonFromPoints(points)
  layer.add(line)

  stage.add(layer)
}
