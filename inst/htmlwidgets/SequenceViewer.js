HTMLWidgets.widget({

  name: 'SequenceViewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        let seq = new Sequence(x.sequence);
        seq.render("#" + el.id, {

        });
        let comb = intersect(x.domains, {start: x.peptide_start, end: x.peptide_end, color: "black", underscore: false, bgcolor: "#ffd891"}, x.underscore_pos-1);
        seq.coverage(comb);
        if (x.legend) {
          seq.addLegend(x.legend);
        }
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
