namespace('Sudoku.Models')

var EMPTY_VALUE = 0,
    BOX_SIZE = 3

Sudoku.Models.Grid = function(config) {
  this.cells  = config.cells
  this.digits = '123456789'
  this.rows   = 'ABCDEFGHI'
  this.cols   = this.digits
  this.units  = {}

  this._on = {
    change: []
  }

  this.initialize = function() {
    this.units  = this.generateUnits()
    this.peers  = this.generatePeers()
  }

  this.generateRows = function() {
    var rows = []

    for (var i = 0; i < this.cols.length; i++) {
      rows.push(this.cross(this.rows, this.cols[i]))
    }
    return rows
  }

  this.generateColumns = function() {
    var columns = []

    for (var i = 0; i < this.rows.length; i++) {
      columns.push(this.cross(this.rows[i], this.cols))
    }
    return columns
  }

  this.generateBoxes = function() {
    var boxes = []

    for (var i = 0; i < BOX_SIZE; i++) {
      var ioffset = i * BOX_SIZE,
          boxRow  = this.rows.substring(ioffset, ioffset + BOX_SIZE)

      for (var j = 0; j < BOX_SIZE; j++) {
        var joffset    = j * BOX_SIZE,
            boxColumns = this.cols.substring(joffset, joffset + BOX_SIZE)

        boxes.push(this.cross(boxRow, boxColumns))
      }
    }
    return boxes
  }

  this.generateUnits = function() {
    var rows    = this.generateRows(),
        columns = this.generateColumns(),
        boxes   = this.generateBoxes(),
        units   = rows.concat(columns).concat(boxes),
        indices = this.cross(this.rows, this.cols),
        mapping = {}

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]

      if (!mapping[index]) mapping[index] = []

      for (var j = 0; j < units.length; j++) {
        if (units[j].indexOf(index) >= 0) {
          mapping[index].push(units[j])
        }
      }
    }
    return mapping
  }

  this.generatePeers = function() {
    var mapping = {}

    for (var index in this.units) {
      var flatten = [],
          unique  = []

      flatten = flatten.concat.apply(flatten, this.units[index])
      for (var i = 0; i < flatten.length; i++) {
        if (unique.indexOf(flatten[i]) === -1 && flatten[i] !== index) {
          unique.push(flatten[i])
        }
      }
      mapping[index] = unique
    }
    return mapping
  }

  this.generateValues = function() {
    var mapping = {},
        indices = this.cross(this.rows, this.cols),
        values  = this.getValueMap()

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]

      mapping[index] = this.digits
    }

    for (var index in values) {
      if (this.digits.indexOf(values[index]) >= 0 && !this.assign(mapping, index, values[index])) {
        return false
      }
    }
    return mapping
  }

  this.getValueMap = function() {
    var mapping = {},
        indices = this.cross(this.rows, this.cols)

    for (var i = 0; i < this.cells.length; i++) {
      mapping[indices[i]] = parseInt(this.cells[i])
    }
    return mapping
  }

  this.assign = function(mapping, index, value) {
    var otherValues = mapping[index].replace(value, '')

    for (var i = 0; i < otherValues.length; i++) {
      if (!this.eliminate(mapping, index, otherValues[i])) {
        return false
      }
    }
    return mapping
  }

  this.eliminate = function(mapping, index, value) {
    if (mapping[index].indexOf(value) === -1) return mapping
    mapping[index] = mapping[index].replace(value, '')

    if (mapping[index].length === 0) {
      return false
    }
    if (mapping[index].length === 1) {
      var value2 = mapping[index]

      for (var i = 0; i < this.peers[index].length; i++) {
        if (!this.eliminate(mapping, this.peers[index][i], value2)) return false
      }
    }

    for (var i = 0; i < this.units[index].length; i++) {
      var unit = this.units[index][i],
          valuePlaces = []

      for (var j = 0; j < unit.length; j++) {
        if (mapping[unit[j]].indexOf(value) >= 0) valuePlaces.push(unit[j])
      }

      if (valuePlaces.length === 0) return false
      if (valuePlaces.length === 1) {
        if (!this.assign(mapping, valuePlaces[0], value)) return false
      }
    }
    return mapping
  }

  this.increment = function(index) {
    this.cells[index] = this.valueAt(index) + 1
    this.trigger('change')
  }

  this.reset = function(index) {
    this.cells[index] = EMPTY_VALUE
    this.trigger('change')
  }

  this.cycle = function(index) {
    if (this.valueAt(index) < this.max()) {
      this.increment(index)
    } else {
      this.reset(index)
    }
  }

  this.max = function() {
    return parseInt(this.digits[this.digits.length - 1])
  }

  this.valueAt = function(index) {
    if (0 <= index && index <= this.cells.length) {
      return parseInt(this.cells[index])
    }
  }

  this.search = function(mapping) {
    if (!mapping) return false

    var indices = this.cross(this.rows, this.cols)

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]

      if (mapping[index].length !== 1) {
        var smallestIndex = this.indexOfSmallest(mapping),
            searches = []

        for (var j = 0; j < mapping[smallestIndex]; j++) {
          var value = mapping[smallestIndex][j],
              clone = JSON.parse(JSON.stringify(mapping))

          searches.push(this.search(this.assign(clone, smallestIndex, value)))
        }

        return this.some(searches)
      }
    }
    return mapping
  }

  this.some = function(sequence) {
    for (var i = 0; i < sequence.length; i++) {
      if (sequence[i]) return sequence[i]
    }
    return false
  }

  this.indexOfSmallest = function(mapping) {
    var smallestLength = this.digits.length,
        smallestIndex

    for (var index in mapping) {
      if (mapping[index].length > 1 && mapping[index].length < smallestLength) {
        smallestLength = mapping[index].length
        smallestIndex = index
      }
      if (smallestLength === 2) return smallestIndex
    }
    return smallestIndex
  }

  this.solve = function() {
    this.values = this.search(this.generateValues())
    if (!this.values) return false
    this.cells = []

    for (var index in this.values) {
      this.cells.push(this.values[index])
    }
    this.trigger('change')
  }

  this.cross = function(a, b) {
    var results = []

    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        results.push(a[i] + b[j])
      }
    }
    return results
  }

  this.toJSON = function() {
    return this.cells
  }

  this.on = function(event, callback) {
    this._on[event].push(callback)
  }

  this.trigger = function(event, details) {
    for (var i = 0; i < this._on[event].length; i++) {
      this._on[event][i](details)
    }
  }

  this.initialize()
}
