!function() {
  var grid = new Sudoku.Models.Grid({
    cells: new Array(82).join(0).split('')
  })

  var gridView = new Sudoku.Views.Grid({
    el: document.querySelector('.sudoku-grid'),
    model: grid
  })

  gridView.render()

  document.querySelector('.sample').addEventListener('click', function(e) {
    e.preventDefault()
    var randomIndex = Math.floor(Math.random() * Sudoku.Datasets.puzzles.length)

    gridView.setModel(
      new Sudoku.Models.Grid({
        cells: Sudoku.Datasets.puzzles[randomIndex].split('')
      })
    )
    gridView.render()
  })

  document.querySelector('.solve').addEventListener('click', function(e) {
    e.preventDefault()
    gridView.solve()
  })
}()
