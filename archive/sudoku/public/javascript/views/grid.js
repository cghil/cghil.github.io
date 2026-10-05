namespace('Sudoku.Views')

Sudoku.Views.Grid = function(config) {
  this.el = config.el

  this.initialize = function(options) {
    this.setModel(options.model)
    this.setListeners()
  }

  this.setModel = function(model) {
    this.model = model
    this.model.on('change', this.render.bind(this))
  }

  this.setListeners = function() {
    this.el.addEventListener('click', this.handleClick.bind(this))
  }

  this.handleClick = function(e) {
    if (this.isCell(e.target)) {
      this.model.cycle(parseInt(e.target.dataset.index))
    }
  }

  this.solve = function() {
    this.model.solve()
  }

  this.isCell = function(node) {
    return node && new RegExp('cell').test(node.className)
  }

  this.template = function(cells) {
    var html = ''

    for (var i = 0; i < cells.length; i++) {
      var value = parseInt(cells[i]) || ''

      html += '<div class="cell" data-index=' + i + '>' + value + '</div>'
    }
    return html
  }

  this.render = function() {
    this.el.innerHTML = this.template(this.model.toJSON())
  }

  this.initialize(config)
}
