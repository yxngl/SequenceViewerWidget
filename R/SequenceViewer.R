#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
SequenceViewer <- function(sequence, peptide_start=NULL, peptide_end=NULL,
                           highlight_position=NULL, coverage=list(), legend=NULL, width = NULL, height = NULL,
                           elementId = NULL) {

  # forward options using x
  x = list(
    sequence = sequence,
    peptide_start = peptide_start,
    peptide_end = peptide_end,
    highlight_pos = highlight_position,
    domains=coverage,
    legend=legend
  )


  # create widget
  htmlwidgets::createWidget(
    name = 'SequenceViewer',
    x=x,
    width = width,
    height = height,
    package = 'SequenceViewerWidget',
    elementId = elementId
  )
}

#' Shiny bindings for SequenceViewer
#'
#' Output and render functions for using SequenceViewer within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a SequenceViewer
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name SequenceViewer-shiny
#'
#' @export
SequenceViewerOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'SequenceViewer', width, height, package = 'SequenceViewerWidget')
}

#' @rdname SequenceViewer-shiny
#' @export
renderSequenceViewer <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, SequenceViewerOutput, env, quoted = TRUE)
}
